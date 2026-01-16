import { CSS } from "@dnd-kit/utilities";
import { SquarePen } from "lucide-react";
import { useDraggable } from "@dnd-kit/core";

export default function TaskCard({ task, onEdit}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useDraggable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    willChange: "transform",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}
      className={`card bg-base-100 shadow cursor-grab select-none 
        ${task.isImportant ? "outline-2 outline-dashed outline-red-500/80" : ""
      } `}
      aria-label={`Task ${task.title}`}
    >
      <div className="card-body p-3 flex flex-col">
        <div className="card-title flex flex-row">
          <h3 className="text-lg font-bold text-neutral truncate">{task.title}</h3>
          <button className="btn btn-square btn-ghost ml-auto btn-sm" 
            onClick={()=>onEdit(task)}
          >
            <SquarePen/>
          </button>
        </div>
        <p className="whitespace-pre-wrap text-md font-normal break-normal text-neutral truncate">{task.description}</p>

        {/* timeline row */}
        <div className="flex w-full max-w-50 self-center items-center justify-between gap-2 mt-auto text-xs text-neutral opacity-50">
          <div className="text-left">{task.startTime.toLocaleTimeString([], {timeStyle: 'short'})}</div>
          <div className="divider divider-neutral my-1 opacity-50 grow"></div>
          <div className="text-right">{task.endTime.toLocaleTimeString([], {timeStyle: 'short'})}</div>
        </div>
        
      </div>
    </div>
  );
}
