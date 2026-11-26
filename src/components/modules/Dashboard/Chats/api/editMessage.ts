import apiClient from "@/services/ApiClient";

export const editMessage = (messageId: number, message: string) => {
  return apiClient.patch(`/messages/${messageId}`, { message });
};
