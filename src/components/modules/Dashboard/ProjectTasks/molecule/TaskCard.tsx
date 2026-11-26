import {
  CalendarDays,
  Paperclip,
  MoreVertical,
  Pencil,
  Trash2,
} from "lucide-react";
import { useTranslation } from "react-i18next";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import type { ProjectTask } from "../types/TaskType";

const priorityColors = {
  Critical: "bg-red-500/10 text-red-600",
  High: "bg-red-500/10 text-red-600",
  Medium: "bg-amber-500/10 text-amber-600",
  Low: "bg-green-500/10 text-green-600",
};

interface Props {
  task: ProjectTask;
  onEdit: (task: ProjectTask) => void;
  onDelete: (task: ProjectTask) => void;
}

const TaskCard = ({ task, onEdit, onDelete }: Props) => {
  const { t, i18n } = useTranslation();

  const dueDate = task.due_date
    ? new Date(task.due_date).toLocaleDateString(i18n.language, {
        month: "short",
        day: "numeric",
      })
    : null;

  const assigneeName = task.assignee?.name || "Unassigned";

  const initials = task.assignee?.name
    ? task.assignee.name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "?";

  return (
    <Card className="gap-0 bg-muted/40 py-4 shadow-none">
      <CardContent className="flex flex-col gap-3 px-4">
        <div className="flex items-start justify-between gap-2">
          <h4 className="text-sm font-semibold">{task.name}</h4>

          <div className="flex items-center gap-2">
            <Badge
              variant="secondary"
              className={`border-transparent ${priorityColors[task.priority]}`}
            >
              {t(`projects.priority.${task.priority}`)}
            </Badge>

            <DropdownMenu>
              <DropdownMenuTrigger >
                <button
                  type="button"
                  className="rounded-md p-1 text-muted-foreground hover:bg-muted"
                >
                  <MoreVertical className="size-4" />
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onEdit(task)}>
                  <Pencil className="mr-2 size-4" />
                  {t("projects.taskActions.edit")}
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => onDelete(task)}
                  className="text-destructive focus:text-destructive"
                >
                  <Trash2 className="mr-2 size-4" />
                  {t("projects.taskActions.delete")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <p className="line-clamp-2 min-h-8 text-xs text-muted-foreground">
          {task.description || t("projects.taskActions.noDescription")}
        </p>

        <div className="flex items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-2">
            <Avatar className="size-6">
              <AvatarImage src={task.assignee?.avatar_url ?? undefined} />
              <AvatarFallback className="text-[10px]">
                {initials}
              </AvatarFallback>
            </Avatar>

            <span className="truncate text-xs">{assigneeName}</span>
          </div>

          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              {task.attachments_count}
              <Paperclip className="size-3" />
            </span>

            {dueDate && (
              <span className="flex items-center gap-1">
                {dueDate}
                <CalendarDays className="size-3" />
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
