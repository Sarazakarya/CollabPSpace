import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

import type { AddTaskProps, TaskFormValues } from "../types/TaskType";

const AddTaskModal = ({
  open,
  setOpen,
  form,
  onSubmit,
  isPending,
  projectId,
}: AddTaskProps) => {
  const { t } = useTranslation();

  const { register, handleSubmit, setValue, watch } = form;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {t("projects.taskForm.title")}
          </DialogTitle>

          <DialogDescription>
            {t("projects.taskForm.description")}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="rounded-lg bg-muted p-3 text-sm">
            {t("projects.taskForm.projectId")}: {projectId}
          </div>

          <div className="space-y-2">
            <Label>{t("projects.taskForm.name")} *</Label>
            <Input
              {...register("name", { required: true })}
              placeholder={t("projects.taskForm.namePlaceholder")}
            />
          </div>

          <div className="space-y-2">
            <Label>{t("projects.taskForm.taskDescription")}</Label>
            <Textarea
              {...register("description")}
              placeholder={t("projects.taskForm.descriptionPlaceholder")}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>{t("projects.taskForm.priority")}</Label>

              <Select
                value={watch("priority")}
                onValueChange={(value) =>
                  setValue("priority", value as TaskFormValues["priority"])
                }
              >
                <SelectTrigger>
                  <SelectValue
                    placeholder={t("projects.taskForm.selectPriority")}
                  />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="Low">
                    {t("projects.priority.Low")}
                  </SelectItem>
                  <SelectItem value="Medium">
                    {t("projects.priority.Medium")}
                  </SelectItem>
                  <SelectItem value="High">
                    {t("projects.priority.High")}
                  </SelectItem>
                  <SelectItem value="Critical">
                    {t("projects.priority.Critical")}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>{t("projects.taskForm.status")}</Label>

              <Select
                value={watch("status")}
                onValueChange={(value) =>
                  setValue("status", value as TaskFormValues["status"])
                }
              >
                <SelectTrigger>
                  <SelectValue
                    placeholder={t("projects.taskForm.selectStatus")}
                  />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="Pending">
                    {t("projects.kanban.todo")}
                  </SelectItem>
                  <SelectItem value="In Progress">
                    {t("projects.kanban.inProgress")}
                  </SelectItem>
                  <SelectItem value="In Review">
                    {t("projects.kanban.inReview")}
                  </SelectItem>
                  <SelectItem value="Completed">
                    {t("projects.kanban.completed")}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>{t("projects.taskForm.dueDate")}</Label>
            <Input type="date" {...register("due_date")} />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              {t("common.cancel")}
            </Button>

            <Button type="submit" disabled={isPending}>
              {isPending
                ? t("projects.taskForm.creating")
                : t("projects.taskForm.create")}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTaskModal;
