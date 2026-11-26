import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

import type { TaskColumnProps } from "../types/Taskstype";
import TaskCard from "./TaskCard";

const TaskColumn = ({
  title,
  tasks,
  color,
  onAddTask,
  onEdit,
  onDelete,
}: TaskColumnProps) => {
  return (
    <section className="min-w-0 overflow-hidden rounded-xl border bg-card">
      <div className="flex items-center justify-between px-3 py-3">
        <div className="flex items-center gap-2">
          <span className={`h-2.5 w-2.5 rounded-full ${color}`} />
          <h2 className="text-sm font-semibold">{title}</h2>
          <span className="rounded-full bg-muted px-2 py-0.5 text-xs">
            {tasks.length}
          </span>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={onAddTask}
          className="h-8 w-8"
        >
          <Plus size={16} />
        </Button>
      </div>

      <div className="space-y-3 p-3">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </section>
  );
};

export default TaskColumn;
