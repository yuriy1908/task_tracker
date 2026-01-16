import { useDroppable } from "@dnd-kit/core";
import TaskCard from "./TaskCard";
import { CalendarPlus2 } from "lucide-react";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

const DayColumn = ({ date, tasks, dayOfTheWeek, loading, onAdd, onEdit, activeTask }) => {
  const { setNodeRef } = useDroppable({ id: date });

  return (
    <div ref={setNodeRef} className="card bg-neutral-200 shadow-inner min-h-[200px] overflow-hidden transition-[max-height] duration-300 ease-in-out">
      <div className="card-body p-4 flex flex-col gap-4">
        <div className="card-title font-bold text-neutral ">
          <h2 className="text-xl">{dayOfTheWeek}</h2>
          <button 
            className="btn btn-square btn-ghost hover:bg-neutral hover:text-neutral-content"
            onClick={() => onAdd(new Date(date))}>
            <CalendarPlus2 />
          </button>
          <span className="badge badge-neutral font-medium ml-auto">
            {loading ? "0" : tasks.length}
          </span>
        </div>
        {!loading && (
          <div className="flex flex-col gap-4">
            {tasks
              .filter(t => t.id !== activeTask?.id)
              .sort((a, b) => a.startTime - b.startTime)
              .map(task => <TaskCard key={task.id} task={task} onEdit={onEdit}/>)
            }
          </div>
        )}
      </div>
    </div>
  );
}

export default DayColumn;