import { useState, useEffect } from "react";

const AddTaskModal = ({ open, onClose, onSubmit, defaultDate }) => {

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    if (defaultDate) setDate(defaultDate.toISOString().split("T")[0]);
  }, [defaultDate]);

  if (!open) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">Новая задача</h3>

        <input
          className="input input-bordered w-full mb-3"
          placeholder="Название задачи"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="date"
          className="input input-bordered w-full"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <div className="modal-action">
          <button className="btn" onClick={onClose}>
            Отмена
          </button>
          <button
            className="btn btn-primary"
            onClick={() => {
              onSubmit({ title, date });
              onClose();
            }}
          >
            Создать
          </button>
        </div>
      </div>
    </div>
  );
}


export default AddTaskModal;