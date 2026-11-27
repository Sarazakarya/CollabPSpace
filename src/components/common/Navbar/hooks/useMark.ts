import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useApiMutation } from "@/shared/hooks/useApiMutation";
import { useAlert } from "@/shared/hooks/useAlert";
import { notificationKeys } from "./useNotifications";
import { markNotificationAsRead } from "../api/markNotificationAsRead";

export const useMarkNotificationAsRead = () => {
  const queryClient = useQueryClient();
  const { showAlert } = useAlert();
  const { t } = useTranslation();

  return useApiMutation({
    mutationFn: markNotificationAsRead,

    options: {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: notificationKeys.all,
        });

        showAlert("success", t("notifications.markReadSuccess"));
      },

      onError: () => {
        showAlert("error", t("notifications.markReadError"));
      },
    },
  });
};
