import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useApiMutation } from "@/shared/hooks/useApiMutation";
import { useAlert } from "@/shared/hooks/useAlert";
import { notificationKeys } from "./useNotifications";
import { markAllNotificationsAsRead } from "../api/markAllNotificationsAsRead";


export const useMarkAllNotificationsAsRead = () => {
  const queryClient = useQueryClient();
  const { showAlert } = useAlert();
  const { t } = useTranslation();

  return useApiMutation({
    mutationFn: markAllNotificationsAsRead,

    options: {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: notificationKeys.all,
        });

        showAlert("success", t("notifications.markAllSuccess"));
      },

      onError: () => {
        showAlert("error", t("notifications.markAllError"));
      },
    },
  });
};
