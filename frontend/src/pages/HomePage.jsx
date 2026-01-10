import { useEffect, useMemo, useState } from "react";
import api from "../api/axiosClient";
import axios from "axios";
import { ArrowBigLeft, ArrowBigRight } from 'lucide-react'
import AddTaskModal from "../components/AddTaskModal";
import { dateToMonday, addDays, daysOfWeek } from "../utils/dates";

const HomePage = () => 
{
  const [currentDate, setCurrentDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const [modal, setModal] = useState({
    open: false,
    date: null,
  });

  const openModal = (date) => {
    setModal({ open: true, date });
  };

  const closeModal = () => {
    setModal({ open: false, date: null });
  };

  const onAddModalSubmit = (title, date) => 
  {
    api.post('/ScheduleItem/')
  }

  const weekStart = useMemo(() => dateToMonday(currentDate), [currentDate]);
  const weekEnd = useMemo(() => addDays(weekStart, 6), [weekStart]);

  const weekRangeLabel = useMemo(() => 
    `${weekStart.toLocaleDateString()} – ${weekEnd.toLocaleDateString()}`, [weekStart, weekEnd]
  );

  useEffect(() => {
    const controller = new AbortController();
    const from = weekStart.toISOString().split("T")[0];
    const to = weekEnd.toISOString().split("T")[0];

    setLoading(true);
    api.get(`/ScheduleItem/by-date-interval?from=${from}&to=${to}`, {
      params: { from, to },
      signal: controller.signal
    })
      .then((res) => setTasks(res.data))
      .finally(() => setLoading(false))
      .catch(err => {
        if (axios.isCancel(err)) {
          console.log("Request canceled in component:", err.message);
        } else {
          console.error(err);
        }
      });

    return () => controller.abort();
  }, [weekStart, weekEnd]);

  const tasksByDay = useMemo(() => {
    return tasks.reduce((acc, task) => {
      const day = new Date(task.startTime).getDay();
      const index = day === 0 ? 6 : day - 1;
      acc[index] ??= [];
      acc[index].push(task);
      return acc;
    }, {});
  }, [tasks]);


  return (
    <div className="min-h-screen bg-base-200 p-6 pt-2">
      <div className="navbar mb-6">
        <div className="navbar-start">
          <h1 className="text-2xl font-bold">Расписание на неделю</h1>
        </div>

        <div className="navbar-center" />

        <div className="navbar-end flex gap-2 items-center">
          <button
            className="btn btn-md"
            onClick={() => setCurrentDate(addDays(currentDate, -7))}
          >
            <ArrowBigLeft />
          </button>
          <span className="font-medium opacity-70">{weekRangeLabel}</span>
          <button
            className="btn btn-md"
            onClick={() => setCurrentDate(addDays(currentDate, 7))}
          >
            <ArrowBigRight />
          </button>
        </div>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
        {daysOfWeek.map((day, index) => (
          <div key={day} className="card bg-base-100 shadow-md">
            <div className="card-body p-4">
              <h2 className="card-title text-sm">
                <button className="btn btn-outline btn-sm" onClick={() => openModal(addDays(weekStart, index))}>
                  +
                </button>
                {day}
                <span className="badge badge-outline ml-auto">
                  {(tasksByDay[index] ?? []).length}
                </span>
                
              </h2>

              <div className="flex flex-col mt-4 gap-2">
                {loading && (
                  <p className="text-xs opacity-50">Загрузка<span className="loading loading-dots loading-xs"></span></p>
                )}

                {!loading && (tasksByDay[index] ?? []).length === 0 && (
                  <p className="text-xs opacity-50">Нет задач</p>
                )}

                {(tasksByDay[index] ?? []).map((task) => {
                  
                  const start = new Date(task.startTime);
                  const end = new Date(task.endTime);
                  return (
                    <div
                      key={task.id}
                      className="rounded-lg bg-primary text-white p-2 text-xs sm:text-sm shadow"
                    >
                      <p className="text-sm font-medium">{task.title}</p>
                      <p className="text-xs opacity-60">
                        {start.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}-
                        {end.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
      <AddTaskModal
        open={modal.open}
        defaultDate={modal.date}
        onClose={closeModal}
      />
    </div>
  );
}

export default HomePage;