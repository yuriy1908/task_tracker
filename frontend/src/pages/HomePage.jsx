import { useEffect, useMemo, useState } from "react";
import api from "../api/axiosClient";
import axios from "axios";
import { ArrowBigLeft, ArrowBigRight } from 'lucide-react'
import AddTaskModal from "../components/AddTaskModal";
import { closestCenter, DndContext, DragOverlay, PointerSensor, useSensors, useSensor } from "@dnd-kit/core";
import DayColumn from "../components/DayColumn";
import { daysOfWeek, copyTime, dateToString } from "../utils/dates";
import { startOfWeek, addDays } from "date-fns";
import TaskCard from "../components/TaskCard";
import EditTaskModal from "../components/EditTaskModal";

const HomePage = () => 
{
  const [currentDate, setCurrentDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const [addModal, setAddModal] = useState({open: false, date: null,});
  const openAddModal = (date) => setAddModal({ open: true, date });
  const closeAddModal = () => setAddModal({ open: false, date: null });

  const [editModal, setEditModal] = useState({ open: false, task: null });
  const openEditModal = (task) => setEditModal({ open: true, task });
  const closeEditModal = () => setEditModal({ open: false, task: null });

  const weekStart = useMemo(() => startOfWeek(currentDate, { weekStartsOn: 1 }), [currentDate]);
  const weekEnd = useMemo(() => addDays(weekStart, 7), [weekStart]);

  const weekRangeLabel = useMemo(() => 
    `${weekStart.toLocaleDateString()} – ${addDays(weekEnd,-1).toLocaleDateString()}`, [weekStart, weekEnd]
  );

  const sensors = useSensors(
  useSensor(PointerSensor, {
      activationConstraint: {
        distance: 0, 
        filter: (event) => !event.target.closest("button")
      },
    })
  );

  useEffect(() => {
    const controller = new AbortController();
    const from = dateToString(weekStart)
    const to = dateToString(weekEnd)

    setLoading(true);
    api.get(`/ScheduleItem/by-date-interval`, {
      params: { from, to },
      signal: controller.signal
    })
      .then((res) => {
        const normalized = res.data.map((task) => ({
          ...task,
          startTime: new Date(task.startTime),
          endTime: new Date(task.endTime),
        }));
        setTasks(normalized);
      })
      .catch(err => {
        if (axios.isCancel(err)) {
          console.log("Request canceled in component:", err.message);
        } else {
          console.error(err);
        }
      })
      .finally(() => setLoading(false))

    return () => controller.abort();
  }, [weekStart, weekEnd]);

  const tasksByDay = useMemo(() => {
    const acc = {};
    tasks.forEach((task) => {
      const start = task.startTime;
      if (start < weekStart || start >= weekEnd) return;
      const day = start.getDay();
      const index = day === 0 ? 6 : day - 1;
      acc[index] ??= [];
      acc[index].push(task);
    });
    return acc;
  }, [tasks]);

  const [activeTask, setActiveTask] = useState(null);

  const onDragStart = ({ active }) => {
    const task = tasks.find((t) => t.id === active.id);
    setActiveTask(task);
  };

  const onDragEnd = ({ active, over }) => {
    if (!over) {
      setActiveTask(null);
      return;
    }

    const taskId = active.id;
    const dayString = over.id;

    const task = tasks.find((t) => t.id === taskId);

    if (!task) {
      setActiveTask(null);
      return;
    }
    
    const newDate = new Date(dayString);
    const newStartTime = copyTime(task.startTime, newDate);
    const newEndTime = copyTime(task.endTime, newDate);

    api.put("/ScheduleItem", {
      Id: taskId,
      StartTime: newStartTime,
      EndTime: newEndTime,
      Description: task.description,
      Title: task.title
    });

    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId ? { ...t, startTime: newStartTime, endTime: newEndTime } : t
      )
    );
    setActiveTask(null);
  }


  return (
    <div className="min-h-screen bg-base-100 p-6 pt-2 flex flex-col">
      <div className="navbar mb-6 px-0 flex flex-row justify-center md:justify-normal">
        <div className="">
          <h1 className="text-3xl text-neutral font-black hidden md:block">Расписание на неделю</h1>
        </div>

        <div className="ml-0 md:ml-auto flex gap-2 items-center text-neutral">
          <button
            className="btn btn-square btn-ghost"
            onClick={() => setCurrentDate(addDays(currentDate, -7))}
          >
            <ArrowBigLeft />
          </button>
          <span className="font-normal text-xl">{weekRangeLabel}</span>
          <button
            className="btn btn-square btn-ghost"
            onClick={() => setCurrentDate(addDays(currentDate, 7))}
          >
            <ArrowBigRight />
          </button>
        </div>
      </div>

      <DndContext
        collisionDetection={closestCenter}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragCancel={() => setActiveTask(null)}
        sensors={sensors}
      >
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4 ">
          {daysOfWeek.map((day, index) => {
            const dayDate = addDays(weekStart, index);
            return (<DayColumn
              key={index}
              dayOfTheWeek={day}
              date={dateToString(dayDate)}
              tasks={loading ? null : tasksByDay[index] ?? []}
              loading={loading}
              onAdd={openAddModal}
              onEdit={openEditModal}
              activeTask={activeTask}
            />)
            })}
        </div>
        <DragOverlay>
          {activeTask ? <TaskCard task={activeTask} /> : null}
        </DragOverlay>
      </DndContext>
    
      <AddTaskModal
        open={addModal.open}
        defaultDate={addModal.date}
        onClose={closeAddModal}
        onAddTask={(newTask) => setTasks(prev => [...prev, newTask])}
      />
      <EditTaskModal
        open={editModal.open}
        task={editModal.task}
        onClose={closeEditModal}
        onUpdateTask={(updatedTask) =>
          setTasks(prev => prev.map(t => t.id === updatedTask.id ? updatedTask : t))
        }
        onDeleteTask={(id) => setTasks(prev => prev.filter(t => t.id !== id))}
      />
    </div>
  );
}

export default HomePage;