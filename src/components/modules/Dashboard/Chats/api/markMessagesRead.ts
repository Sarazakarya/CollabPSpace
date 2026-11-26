import apiClient from "@/services/ApiClient";

export const markMessagesRead = (projectId: number) => {
  return apiClient.post(`/projects/${projectId}/messages/mark-read`);
};
