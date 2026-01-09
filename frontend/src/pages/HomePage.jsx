import { useEffect, useMemo, useState } from "react";
import api from "../api/axiosClient";
import axios from "axios";
import { ArrowBigLeft, ArrowBigRight } from 'lucide-react'

const HomePage = () => 
{
  const [currentDate, setCurrentDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const startOfWeek = (date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(d.setDate(diff));
  }

  const addDays = (date, days) => {
    const d = new Date(date);
    d.setDate(d.getDate() + days);
    return d;
  }

  const weekStart = useMemo(() => startOfWeek(currentDate), [currentDate]);
  const weekEnd = useMemo(() => addDays(weekStart, 6), [weekStart]);

  const weekRangeLabel = useMemo(() => {

    return `${weekStart.toLocaleDateString()} – ${weekEnd.toLocaleDateString()}`;
  }, [weekStart, weekEnd]);

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
    <div className="min-h-screen bg-base-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Расписание на неделю</h1>
        <div className="flex gap-2 items-center">
          <button
            className="btn btn-sm"
            onClick={() => setCurrentDate(addDays(currentDate, -7))}
          >
          <ArrowBigLeft/>
          </button>
          <span className="font-medium opacity-70">{weekRangeLabel}</span>
          <button
            className="btn btn-sm"
            onClick={() => setCurrentDate(addDays(currentDate, 7))}
          >
          <ArrowBigRight/>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
        {daysOfWeek.map((day, index) => (
          <div key={day} className="card bg-base-100 shadow-md">
            <div className="card-body p-4">
              <h2 className="card-title text-sm justify-between">
                {day}
                <span className="badge badge-outline">
                  {(tasksByDay[index] ?? []).length}
                </span>
              </h2>

              <div className="mt-3 flex flex-col gap-2">
                {loading && (
                  <p className="text-xs opacity-50">Loading<span className="loading loading-dots loading-xs"></span></p>
                )}

                {!loading && (tasksByDay[index] ?? []).length === 0 && (
                  <p className="text-xs opacity-50">No tasks</p>
                )}

                {(tasksByDay[index] ?? []).map((task) => (
                  <div
                    key={task.id}
                    className="rounded-xl border border-base-300 p-2 hover:bg-base-200 transition"
                  >
                    <p className="text-sm font-medium">{task.title}</p>
                    <p className="text-xs opacity-60">
                      {new Date(task.startTime).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                      {task.endDate &&
                        ` – ${new Date(task.endTime).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}`}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;