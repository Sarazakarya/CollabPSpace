import { isAxiosError } from "axios";
import { useTranslation } from "react-i18next";

import { useApiMutation } from "@/shared/hooks/useApiMutation";
import { useAlert } from "@/shared/hooks/useAlert";

import type { ApiErrorResponse } from "@/shared/types/api-error-response";
import type {
  CreateTaskFormValues,
  CreateTaskPayload,
} from "../types/Taskstype";

import { createTask } from "../api/createtas";

const useCreateTask = (onSuccessCallback?: () => void) => {
  const { t } = useTranslation();
  const { showAlert } = useAlert();

  const { mutate, isPending } = useApiMutation({
    mutationFn: createTask,

    options: {
      onSuccess: () => {
        showAlert("success", t("projects.alerts.taskCreated"));
        onSuccessCallback?.();
      },

      onError: (error) => {
        const message = isAxiosError<ApiErrorResponse>(error)
          ? error.response?.data?.message
          : undefined;

        showAlert("error", message || t("common.somethingWentWrong"));
      },
    },
  });

  const handleCreateTask = (values: CreateTaskFormValues) => {
    const payload: CreateTaskPayload = {
      ...values,
      project_id: Number(values.project_id),
      team_id: 1,
      due_date: values.due_date || null,
    };
    console.log("CREATE TASK PAYLOAD:", payload);
    mutate(payload);
  };

  return {
    handleCreateTask,
    isPending,
  };
};

export default useCreateTask;
