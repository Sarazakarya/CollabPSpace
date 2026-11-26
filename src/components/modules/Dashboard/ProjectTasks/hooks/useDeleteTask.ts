import { useTranslation } from "react-i18next";
import { isAxiosError } from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { useApiMutation } from "@/shared/hooks/useApiMutation";
import { useAlert } from "@/shared/hooks/useAlert";
import type { ApiErrorResponse } from "@/shared/types/api-error-response";
import { deleteTask } from "../api/deleteTask";

interface Props {
  projectId: number;
  onSuccess: () => void;
}

const useDeleteTask = ({ projectId, onSuccess }: Props) => {
  const { t } = useTranslation();
  const { showAlert } = useAlert();
  const queryClient = useQueryClient();

  return useApiMutation({
    mutationFn: deleteTask,
    options: {
      onSuccess: () => {
        showAlert("success", t("projects.alerts.taskDeleted"));

        queryClient.invalidateQueries({
          queryKey: ["projects", String(projectId), "tasks"],
        });

        onSuccess();
      },

      onError: (error) => {
        const message = isAxiosError<ApiErrorResponse>(error)
          ? error.response?.data?.message
          : undefined;

        showAlert("error", message || t("projects.alerts.taskDeleteError"));
      },
    },
  });
};

export default useDeleteTask;
