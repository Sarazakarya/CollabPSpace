import apiClient from "@/services/ApiClient";

export const deleteNotification = (id: string) => {
  return apiClient.delete(`/notifications/${id}`);
};
