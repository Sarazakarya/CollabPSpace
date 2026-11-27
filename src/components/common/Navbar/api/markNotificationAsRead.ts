import apiClient from "@/services/ApiClient";

export const markNotificationAsRead = (id: string) => {
  return apiClient.patch(`/notifications/${id}/read`);
};
