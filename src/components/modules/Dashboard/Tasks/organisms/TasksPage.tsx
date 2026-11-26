import { useMemo, useState } from "react";
import ErrorState from "@/core/ui-states/ErrorState";
import TasksToolbar from "../molecule/TasksToolbar";
import TasksBoard from "../molecule/TasksBoard";
import CreateTaskModal from "../molecule/CreateTaskModal";
import TasksSkeleton from "../molecule/TasksSkeleton";
import DeletTaskModal from "../molecule/DeletTaskModal";
import type {
  ProjectTask,
  TaskBoardProps,
  CreateTaskFormValues,
} from "../types/Taskstype";

import useCreateTask from "../hooks/useCreateTask";
import useUpdateTask from "../hooks/useUpdateTask";
import useDeleteTask from "../../ProjectTasks/hooks/useDeleteTask";
import useGetProjectTasks from "../hooks/useGetProjectTasks.ts";

const TasksPage = () => {
  const [projectId, setProjectId] = useState<number>(1);

  const [search, setSearch] = useState("");
  const [openCreate, setOpenCreate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedTask, setSelectedTask] = useState<ProjectTask | null>(null);

  const { data, isLoading, isError, refetch } = useGetProjectTasks(projectId);

  const { handleCreateTask, isPending: isCreating } = useCreateTask(() => {
    setOpenCreate(false);
    setSelectedTask(null);
    refetch();
  });

  const updateMutation = useUpdateTask({
    projectId,
    onSuccess: () => {
      setOpenCreate(false);
      setSelectedTask(null);
      refetch();
    },
  });

  const deleteMutation = useDeleteTask({
    projectId,
    onSuccess: () => {
      setOpenDelete(false);
      setSelectedTask(null);
      refetch();
    },
  });

  const tasks: ProjectTask[] = data?.data?.data ?? [];

  const columns = useMemo(() => {
    const statuses = [
      "Pending",
      "In Progress",
      "In Review",
      "Completed",
    ] as const;

    return Object.fromEntries(
      statuses.map((status) => {
        const statusTasks = tasks.filter((task) => task.status === status);

        return [
          status,
          {
            name: status,
            count: statusTasks.length,
            tasks: statusTasks,
          },
        ];
      }),
    ) as TaskBoardProps["columns"];
  }, [tasks]);

  const handleOpenCreate = () => {
    setSelectedTask(null);
    setOpenCreate(true);
  };

  const handleEdit = (task: ProjectTask) => {
    setSelectedTask(task);
    setOpenCreate(true);
  };

  const handleDelete = (task: ProjectTask) => {
    setSelectedTask(task);
    setOpenDelete(true);
  };

  // Delete using the selected task ID
  const handleConfirmDelete = () => {
    if (!selectedTask) return;

    deleteMutation.mutate(selectedTask.id);
  };

  // Create or update task
  const handleSubmitTask = (values: CreateTaskFormValues) => {
    if (selectedTask) {
      updateMutation.mutate({
        taskId: selectedTask.id,
        values,
      });

      return;
    }

    const selectedProjectId = Number(values.project_id);

    if (!selectedProjectId || selectedProjectId <= 0) {
      return;
    }

    setProjectId(selectedProjectId);
    handleCreateTask(values);
  };

  if (projectId > 0 && isLoading) {
    return <TasksSkeleton />;
  }

  if (projectId > 0 && isError) {
    return <ErrorState />;
  }

  return (
    <div className="space-y-6">
      <TasksToolbar
        search={search}
        onSearchChange={setSearch}
        onCreateTask={handleOpenCreate}
      />

      {projectId > 0 && data && (
        <TasksBoard
          columns={columns}
          search={search}
          onAddTask={handleOpenCreate}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      <CreateTaskModal
        open={openCreate}
        onOpenChange={(open) => {
          setOpenCreate(open);

          if (!open) {
            setSelectedTask(null);
          }
        }}
        onSubmit={handleSubmitTask}
        isPending={isCreating || updateMutation.isPending}
        task={selectedTask}
        projectId={projectId}
      />

      <DeletTaskModal
        open={openDelete}
        onOpenChange={(open) => {
          setOpenDelete(open);

          if (!open) {
            setSelectedTask(null);
          }
        }}
        task={
          selectedTask
            ? {
                id: selectedTask.id,
                name: selectedTask.name,
              }
            : null
        }
        onConfirm={handleConfirmDelete}
        isPending={deleteMutation.isPending}
      />
    </div>
  );
};

export default TasksPage;
