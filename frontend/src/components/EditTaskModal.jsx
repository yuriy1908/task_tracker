import { useState, useEffect } from "react";
import { dateToString } from "../utils/dates";
import api from "../api/axiosClient";
import { toast } from "react-hot-toast"; // optional if you use toast notifications

const EditTaskModal = ({ open, onClose, task, onUpdateTask, onDeleteTask }) => {
  const [date, setDate] = useState(dateToString(new Date()));
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (task) {
      try {
        const d = typeof task.startTime === "string" ? new Date(task.startTime) : task.startTime;
        if (!Number.isNaN(d.getTime())) setDate(dateToString(d));
      } catch {}
    }
  }, [task]);

  if (!task || !open) return null;

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const data = new FormData(form);

    const title = data.get("title");
    const description = data.get("description");
    const startTimeInput = data.get("startTime");
    const endTimeInput = data.get("endTime");
    const important = data.get("important") === "on";

    if (endTimeInput < startTimeInput) {
      form.querySelector("[name=endTime]").setCustomValidity(
        "Время окончания не может быть раньше времени начала"
      );
      form.reportValidity();
      return;
    }

    setSubmitting(true);
    try {
      const startLocal = `${date}T${startTimeInput}:00`;
      const endLocal = `${date}T${endTimeInput}:00`;

      const payload = {
        Id: task.id,
        Title: title,
        Description: description,
        StartTime: new Date(startLocal).toISOString(),
        EndTime: new Date(endLocal).toISOString(),
        IsImportant: important,
      };

      await api.put("/ScheduleItem", payload);

      // Update parent state immediately
      onUpdateTask({
        ...task,
        title,
        description,
        startTime: new Date(startLocal),
        endTime: new Date(endLocal),
        isImportant: important,
      });

      onClose();
      form.reset();
    } catch (err) {
      console.error(err);
      toast?.error?.("Не удалось сохранить задачу");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    setSubmitting(true);
    try {
      await api.delete(`/ScheduleItem/${task.id}`);
      onDeleteTask(task.id);
      onClose();
    } catch (err) {
      console.error(err);
      toast?.error?.("Не удалось удалить задачу");
    } finally {
      setSubmitting(false);
    }
  };


  // Pre-fill time fields
  const startTimeDefault = task.startTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const endTimeDefault = task.endTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-lg">
        <h3 className="font-bold text-lg mb-4">Редактировать задачу</h3>

        <form onSubmit={onSubmit} className="space-y-3">
          <input
            name="title"
            required
            minLength={3}
            defaultValue={task.title}
            placeholder="Название задачи"
            className="input input-bordered w-full validator"
          />

          <textarea
            name="description"
            placeholder="Описание (опционально)"
            defaultValue={task.description}
            className="textarea textarea-bordered w-full"
            rows={3}
          />

          <input
            type="date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="input input-bordered w-full validator"
          />

          <div className="grid grid-cols-2 gap-3">
            <input
              type="time"
              name="startTime"
              required
              defaultValue={startTimeDefault}
              className="input input-bordered w-full validator"
            />
            <input
              type="time"
              name="endTime"
              required
              defaultValue={endTimeDefault}
              className="input input-bordered w-full validator"
              onChange={(e) => {
                e.target.form?.querySelector("[name=endTime]")?.setCustomValidity("");
              }}
            />
          </div>

          <label className="label cursor-pointer justify-between">
            <span className="label-text">Важная задача</span>
            <input
              type="checkbox"
              name="important"
              defaultChecked={task.isImportant}
              className="toggle toggle-primary"
            />
          </label>

          <div className="modal-action justify-between">
            <button 
              type="button"
              className="btn btn-error"
              onClick={handleDelete}
              disabled={submitting}
            >
              Удалить
            </button>
            <div className="flex gap-2">
              <button type="button" className="btn" onClick={onClose}>
                Отмена
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={submitting}
              >
                Сохранить
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTaskModal;
