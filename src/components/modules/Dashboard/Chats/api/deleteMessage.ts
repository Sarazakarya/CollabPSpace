import apiClient from "@/services/ApiClient";

export const deleteMessage = (messageId: number) => {
  return apiClient.delete(`/messages/${messageId}`);
};
