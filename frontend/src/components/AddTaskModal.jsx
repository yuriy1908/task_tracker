import { useState, useEffect } from "react";
import { dateToString } from "../utils/dates";
import api from "../api/axiosClient";
import toast from "react-hot-toast";

const AddTaskModal = ({ open, onClose, defaultDate, onAddTask }) => {
  const [date, setDate] = useState(dateToString(new Date()));
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (defaultDate) {
      try {
        const d = typeof defaultDate === "string" ? new Date(defaultDate) : defaultDate;
        if (!Number.isNaN(d.getTime())) setDate(dateToString(d));
      } catch {}
    }
  }, [defaultDate]);

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
    const startTime = data.get("startTime");
    const endTime = data.get("endTime");
    const important = data.get("important") === "on";

    if (endTime < startTime) {
      form.querySelector("[name=endTime]").setCustomValidity(
        "Время окончания не может быть раньше времени начала"
      );
      form.reportValidity();
      return;
    }

    setSubmitting(true);
    try {
      const startLocal = `${date}T${startTime}:00`;
      const endLocal = `${date}T${endTime}:00`;

      const payload = {
        Title: title,
        Description: description,
        StartTime: new Date(startLocal).toISOString(),
        EndTime: new Date(endLocal).toISOString(),
        IsImportant: important,
      };

      const res = await api.post("/ScheduleItem", payload);

      onAddTask({
        ...res.data,
        startTime: new Date(res.data.startTime),
        endTime: new Date(res.data.endTime),
      });

      onClose();
      form.reset();
    } 
    catch (err) 
    {
      console.error(err);
      toast.error("Не удалось создать задачу");
    }
    finally 
    {
      setSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-lg">
        <h3 className="font-bold text-lg mb-4">Новая задача</h3>

        <form onSubmit={onSubmit} className="space-y-3">
          <input
            name="title"
            required
            minLength={3}
            placeholder="Название задачи"
            className="input input-bordered w-full validator"
          />

          <textarea
            name="description"
            placeholder="Описание (опционально)"
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
              defaultValue="09:00"
              className="input input-bordered w-full validator"
              onChange={(e) => {
                e.target.form?.querySelector("[name=endTime]")?.setCustomValidity("");
              }}
            />
            <input
              type="time"
              name="endTime"
              required
              defaultValue="10:00"
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
              className="toggle toggle-primary"
            />
          </label>

          <div className="modal-action">
            <button type="button" className="btn" onClick={onClose}>
              Отмена
            </button>
            <button
              type="submit"
              className="btn btn-neutral"
              disabled={submitting}
            >
              Создать
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTaskModal;