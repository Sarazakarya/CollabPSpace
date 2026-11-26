import { useState } from "react";
import { MoreVertical, Plus } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import type {
  ProjectTasksResponse,
  ProjectTask,
  TaskFormValues,
} from "../types/TaskType";
import { columnsdata } from "../data/ProjectTaskData";
import TaskCard from "./TaskCard";

import DeleteTaskDialog from "./DeleteTaskDialog";

import useCreateTask from "../hooks/useCreateTask";
import useDeleteTask from "../hooks/useDeleteTask";
import AddTaskModal from "./AddTaskModal";

type Columns = ProjectTasksResponse["data"]["columns"];

interface Props {
  columns: Columns;
}

const KanbanBoard = ({ columns }: Props) => {
  const { t } = useTranslation();
  const { id } = useParams();

  const projectId = Number(id);

  const [open, setOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] =
    useState<TaskFormValues["status"]>("Pending");

  const [selectedTask, setSelectedTask] = useState<ProjectTask | null>(null);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<ProjectTask | null>(null);

  const { form, onSubmit, isPending } = useCreateTask({
    projectId,
    selectedStatus,
    task: selectedTask,
    onSuccess: () => {
      setOpen(false);
      setSelectedTask(null);
    },
  });

  const deleteMutation = useDeleteTask({
    projectId,
    onSuccess: () => {
      setDeleteOpen(false);
      setTaskToDelete(null);
    },
  });

  const handleAddTask = (status: TaskFormValues["status"]) => {
    setSelectedTask(null);
    setSelectedStatus(status);
    setOpen(true);
  };

  const handleEditTask = (task: ProjectTask) => {
    setSelectedTask(task);
    setSelectedStatus(task.status);
    setOpen(true);
  };

  const handleDeleteTask = (task: ProjectTask) => {
    setTaskToDelete(task);
    setDeleteOpen(true);
  };

  const confirmDelete = () => {
    if (taskToDelete) {
      deleteMutation.mutate(taskToDelete.id);
    }
  };

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {columnsdata.map((col) => {
          const tasks = columns[col.apiKey]?.tasks ?? [];
          const count = columns[col.apiKey]?.count ?? 0;

          return (
            <Card key={col.apiKey} className="gap-0 overflow-hidden py-0">
              <div
                className={`flex items-center justify-between px-4 py-3 ${col.headerBg}`}
              >
                <h3 className="flex items-center gap-2 text-xs font-semibold">
                  <span className="size-1.5 rounded-full bg-purple-500" />
                  {t(col.label)}
                  <span className="font-normal text-muted-foreground">
                    ({count})
                  </span>
                </h3>

                <MoreVertical className="size-4 text-muted-foreground" />
              </div>

              <div className="flex flex-col gap-3 p-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleAddTask(col.apiKey)}
                  className="w-full gap-1 rounded-full border-dashed border-primary text-primary"
                >
                  {t("projects.kanban.addTask")}
                  <Plus className="size-4" />
                </Button>

                {tasks.length === 0 && (
                  <p className="text-center text-xs text-muted-foreground">
                    {t("projects.kanban.noTasks")}
                  </p>
                )}

                {tasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onEdit={handleEditTask}
                    onDelete={handleDeleteTask}
                  />
                ))}
              </div>
            </Card>
          );
        })}
      </div>

      <AddTaskModal
        open={open}
        setOpen={setOpen}
        form={form}
        onSubmit={onSubmit}
        isPending={isPending}
        projectId={projectId}
        task={selectedTask}
      />

      <DeleteTaskDialog
        open={deleteOpen}
        setOpen={setDeleteOpen}
        task={taskToDelete}
        onConfirm={confirmDelete}
        isPending={deleteMutation.isPending}
      />
    </>
  );
};

export default KanbanBoard;
