import { isAxiosError } from "axios";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "@tanstack/react-query";
import { uploadFile } from "../api/uploadFile";
import { useApiMutation } from "@/shared/hooks/useApiMutation";
import { useAlert } from "@/shared/hooks/useAlert";
import type { ApiErrorResponse } from "@/shared/types/api-error-response";


const useUploadFile = (projectId: string) => {
  const { t } = useTranslation();
  const { showAlert } = useAlert();
  const queryClient = useQueryClient();

  return useApiMutation({
    mutationFn: uploadFile,
    options: {
      onSuccess: async () => {
        showAlert("success", t("projects.files.uploadSuccess"));

        await queryClient.invalidateQueries({
          queryKey: ["projects", projectId, "files"],
        });
      },
      onError: (error) => {
        if (isAxiosError<ApiErrorResponse>(error)) {
          showAlert(
            "error",
            error.response?.data?.message || t("projects.files.uploadError"),
          );
        } else {
          showAlert("error", t("projects.files.uploadError"));
        }
      },
    },
  });
};

export default useUploadFile;
