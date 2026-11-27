import apiClient from "@/services/ApiClient";
import type { UnreadCountResponse } from "../types/notification.types";

export const getUnreadNotificationsCount = () => {
  return apiClient.get<UnreadCountResponse>("/notifications/unread-count");
};