import { useMemo } from "react";
import type { TaskBoardProps } from "../types/Taskstype";
import TaskColumn from "./TaskColumn";

const TasksBoard = ({
  columns,
  search,
  onAddTask,
  onEdit,
  onDelete,
}: TaskBoardProps) => {
  const filteredColumns = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return Object.entries(columns).map(([key, column]) => ({
      key,
      ...column,
      tasks: column.tasks.filter((task) =>
        task.name.toLowerCase().includes(searchValue),
      ),
    }));
  }, [columns, search]);

  const columnColors: Record<string, string> = {
    Pending: "bg-slate-400",
    "In Progress": "bg-blue-500",
    "In Review": "bg-amber-500",
    Completed: "bg-green-500",
  };

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      {filteredColumns.map((column) => (
        <TaskColumn
          key={column.key}
          title={column.name}
          tasks={column.tasks}
          color={columnColors[column.key] ?? "bg-primary"}
          onAddTask={onAddTask}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TasksBoard;
