import { useTranslation } from "react-i18next";
import { isAxiosError } from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { useApiMutation } from "@/shared/hooks/useApiMutation";
import { useAlert } from "@/shared/hooks/useAlert";
import type { ApiErrorResponse } from "@/shared/types/api-error-response";
import { updateTask } from "../api/updateTask";
import type { UpdateTaskProps, UpdateTaskVariables } from "../types/Taskstype";

const useUpdateTask = ({ projectId, onSuccess }: UpdateTaskProps) => {
  const { t } = useTranslation();
  const { showAlert } = useAlert();
  const queryClient = useQueryClient();

  return useApiMutation({
    mutationFn: ({ taskId, values }: UpdateTaskVariables) =>
      updateTask(taskId, values),

    options: {
      onSuccess: () => {
        showAlert("success", t("projects.alerts.taskUpdated"));

        queryClient.invalidateQueries({
          queryKey: ["projects", String(projectId), "tasks"],
        });

        onSuccess();
      },

      onError: (error) => {
        const message = isAxiosError<ApiErrorResponse>(error)
          ? error.response?.data?.message
          : undefined;

        showAlert("error", message || t("projects.alerts.taskUpdateError"));
      },
    },
  });
};

export default useUpdateTask;
