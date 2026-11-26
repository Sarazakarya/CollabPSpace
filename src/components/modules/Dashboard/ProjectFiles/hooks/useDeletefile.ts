import { isAxiosError } from "axios";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "@tanstack/react-query";

import { useApiMutation } from "@/shared/hooks/useApiMutation";
import { useAlert } from "@/shared/hooks/useAlert";
import type { ApiErrorResponse } from "@/shared/types/api-error-response";
import { deleteFile } from "../api/deletefile";

const useDeleteFile = (projectId: string, onDeleteSuccess: () => void) => {
  const { t } = useTranslation();
  const { showAlert } = useAlert();
  const queryClient = useQueryClient();

  return useApiMutation({
    mutationFn: deleteFile,
    options: {
      onSuccess: async () => {
        showAlert("success", t("projects.files.deleteSuccess"));

        onDeleteSuccess();

        await queryClient.invalidateQueries({
          queryKey: ["projects", projectId, "files"],
        });
      },
      onError: (error) => {
        if (isAxiosError<ApiErrorResponse>(error)) {
          showAlert(
            "error",
            error.response?.data?.message || t("projects.files.deleteError"),
          );
        } else {
          showAlert("error", t("projects.files.deleteError"));
        }
      },
    },
  });
};

export default useDeleteFile;
