import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import type {
  CreateTaskFormValues,
  CreateTaskModalProps,
} from "../types/Taskstype";

const CreateTaskModal = ({
  open,
  onOpenChange,
  onSubmit,
  isPending = false,
  task,
  projectId,
}: CreateTaskModalProps) => {
  const { t } = useTranslation();

  const initialForm: CreateTaskFormValues = {
    name: "",
    description: "",
    project_id: 0,
    priority: "Medium",
    status: "Pending",
    assigned_to: null,
    due_date: "",
  };

  const [form, setForm] = useState<CreateTaskFormValues>(initialForm);

  useEffect(() => {
    if (open) {
      if (task) {
        setForm({
          name: task.name,
          description: task.description ?? "",
          project_id: projectId,
          priority: task.priority,
          status: task.status as CreateTaskFormValues["status"],
          assigned_to: task.assigned_to,
          due_date: task.due_date ?? "",
        });
      } else {
        setForm({ ...initialForm });
      }
    }
  }, [open, task]);

  const handleChange = (
    field: keyof CreateTaskFormValues,
    value: string | number | null,
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(form);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {task ? t("tasks.editTask") : t("tasks.createTask")}
          </DialogTitle>

          <DialogDescription>
            {t("tasks.createTaskDescription")}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Project ID *</Label>
            <Input
              type="number"
              min="1"
              value={form.project_id || ""}
              onChange={(e) =>
                handleChange(
                  "project_id",
                  e.target.value ? Number(e.target.value) : 0,
                )
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label>{t("tasks.taskName")} *</Label>
            <Input
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>{t("tasks.description")}</Label>
            <Textarea
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{t("tasks.priority")} *</Label>
              <select
                value={form.priority}
                onChange={(e) => handleChange("priority", e.target.value)}
                required
                className="h-10 w-full rounded-md border bg-background px-3 text-sm"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label>{t("tasks.status")}</Label>
              <select
                value={form.status}
                onChange={(e) => handleChange("status", e.target.value)}
                className="h-10 w-full rounded-md border bg-background px-3 text-sm"
              >
                <option value="Pending">To-do</option>
                <option value="In Progress">In Progress</option>
                <option value="In Review">In Review</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{t("tasks.assigneeId")}</Label>
              <Input
                type="number"
                min="1"
                value={form.assigned_to ?? ""}
                onChange={(e) =>
                  handleChange(
                    "assigned_to",
                    e.target.value ? Number(e.target.value) : null,
                  )
                }
              />
            </div>

            <div className="space-y-2">
              <Label>{t("tasks.dueDate")}</Label>
              <Input
                type="date"
                value={form.due_date}
                onChange={(e) => handleChange("due_date", e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
            >
              {t("common.cancel")}
            </Button>

            <Button
              type="submit"
              disabled={isPending || !form.name.trim() || form.project_id <= 0}
            >
              {isPending
                ? t("tasks.creating")
                : task
                  ? t("tasks.editTask")
                  : t("tasks.createTask")}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTaskModal;
