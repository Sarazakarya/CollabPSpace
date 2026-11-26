import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { isAxiosError } from "axios";
import { useQueryClient } from "@tanstack/react-query";

import { useApiMutation } from "@/shared/hooks/useApiMutation";
import { useAlert } from "@/shared/hooks/useAlert";
import { createTask } from "../api/createTask";
import { updateTask } from "../api/updateTask";

import type { ApiErrorResponse } from "@/shared/types/api-error-response";
import type {
  ProjectTask,
  TaskFormValues,
  CreateTaskPayload,
} from "../types/TaskType";

interface Props {
  projectId: number;
  selectedStatus: TaskFormValues["status"];
  task: ProjectTask | null;
  onSuccess: () => void;
}

const useCreateTask = ({
  projectId,
  selectedStatus,
  task,
  onSuccess,
}: Props) => {
  const { t } = useTranslation();
  const { showAlert } = useAlert();
  const queryClient = useQueryClient();

  const form = useForm<TaskFormValues>({
    defaultValues: {
      name: "",
      description: "",
      priority: "Medium",
      status: selectedStatus,
      team_id: null,
      assigned_to: null,
      due_date: "",
    },
  });

  const { reset } = form;

  useEffect(() => {
    reset({
      name: task?.name ?? "",
      description: task?.description ?? "",
      priority: task?.priority ?? "Medium",
      status: task?.status ?? selectedStatus,
      team_id: task?.team_id ?? null,
      assigned_to: task?.assigned_to ?? null,
      due_date: task?.due_date ?? "",
    });
  }, [task, selectedStatus, reset]);

  const mutation = useApiMutation({
    mutationFn: ({
      values,
      taskId,
    }: {
      values: CreateTaskPayload;
      taskId: number | null;
    }) => {
      if (taskId !== null) {
        return updateTask(taskId, values);
      }

      return createTask(values);
    },

    options: {
      onSuccess: async (_, variables) => {
        await queryClient.invalidateQueries({
          queryKey: ["projects", String(projectId), "tasks"],
        });

        if (variables.taskId !== null) {
          showAlert("success", t("projects.alerts.taskUpdated"));
        } else {
          showAlert("success", t("projects.alerts.taskCreated"));
        }

        reset();
        onSuccess();
      },

      onError: (error) => {
        const message = isAxiosError<ApiErrorResponse>(error)
          ? error.response?.data?.message
          : undefined;

        showAlert("error", message || t("projects.alerts.taskError"));
      },
    },
  });

  const onSubmit = (values: TaskFormValues) => {
    mutation.mutate({
      values: {
        ...values,
        project_id: projectId,
        description: values.description || "",
        due_date: values.due_date || null,
      },
      taskId: task?.id ?? null,
    });
  };

  return {
    form,
    onSubmit,
    isPending: mutation.isPending,
  };
};

export default useCreateTask;
