import { CalendarDays, MoreVertical, UserRound } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { TaskCardProps } from "../types/Taskstype";
import { priorityStyles } from "../data/TasksData";

const TaskCard = ({ task, onEdit, onDelete }: TaskCardProps) => {
  const { t, i18n } = useTranslation();

  const priorityColor =
    priorityStyles[task.priority] ?? "bg-muted text-muted-foreground";

  const dueDate = task.due_date
    ? new Date(task.due_date).toLocaleDateString(
        i18n.language === "ar" ? "ar-EG" : "en-US",
      )
    : null;

  return (
    <Card className="space-y-3 rounded-lg p-3 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-2">
        <h3 className="line-clamp-2 text-sm font-semibold">{task.name}</h3>

        <DropdownMenu>
          <DropdownMenuTrigger className="shrink-0 rounded-md p-1 text-muted-foreground hover:bg-muted">
            <MoreVertical size={17} />
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit?.(task)}>
              {t("common.edit")}
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => onDelete?.(task)}
              className="text-destructive focus:text-destructive"
            >
              {t("common.delete")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {task.description && (
        <p className="line-clamp-2 text-xs text-muted-foreground">
          {task.description}
        </p>
      )}

      <div>
        <Badge
          variant="secondary"
          className={`border-0 text-[11px] ${priorityColor}`}
        >
          {task.priority}
        </Badge>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 border-t pt-3 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <UserRound size={14} />
          <span>{task.assigned_to ?? t("tasks.unassigned")}</span>
        </div>

        {dueDate && (
          <div className="flex items-center gap-1.5">
            <CalendarDays size={14} />
            <span>{dueDate}</span>
          </div>
        )}
      </div>
    </Card>
  );
};

export default TaskCard;
