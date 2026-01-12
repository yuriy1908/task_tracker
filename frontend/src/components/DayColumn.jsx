import { useDroppable } from "@dnd-kit/core";
import TaskCard from "./TaskCard";

const DayColumn = ({ date, tasks, dayOfTheWeek }) => {
  const { setNodeRef } = useDroppable({ id: date });

  return (
    <div ref={setNodeRef} className="card bg-base-100 shadow-md flex flex-col gap-2 p-2 min-h-[200px]">
      <div className="card-body p-4">
        <h2 className="card-title text-sm">
          {dayOfTheWeek}
          <span className="badge badge-outline ml-auto">
            {tasks.length}
          </span>
        </h2>
        {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}

export default DayColumn;