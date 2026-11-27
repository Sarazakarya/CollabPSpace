import apiClient from "@/services/ApiClient";
import type { NotificationsResponse } from "../types/notification.types";

export const getNotifications = () => {
  return apiClient.get<NotificationsResponse>("/notifications", {
    params: {
      per_page: 15,
    },
  });
};
