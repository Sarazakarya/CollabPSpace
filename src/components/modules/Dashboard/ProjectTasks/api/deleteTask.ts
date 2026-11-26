import apiClient from "@/services/ApiClient";

export const deleteTask = (id: number) => {
  return apiClient.delete(`/tasks/${id}`);
};
