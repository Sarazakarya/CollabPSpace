import apiClient from "@/services/ApiClient";
import type { MarkAllReadResponse } from "../types/notification.types";

export const markAllNotificationsAsRead = () => {
  return apiClient.post<MarkAllReadResponse>("/notifications/mark-all-read");
};
