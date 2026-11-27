import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useAlert } from "@/shared/hooks/useAlert";
import { deleteNotification } from "../api/deleteNotification";
import { notificationKeys } from "./useNotifications";

export const useDeleteNotification = () => {
  const queryClient = useQueryClient();
  const { showAlert } = useAlert();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: deleteNotification,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: notificationKeys.all,
      });

      showAlert("success", t("notifications.deleteSuccess"));
    },

    onError: () => {
      showAlert("error", t("notifications.deleteError"));
    },
  });
};
