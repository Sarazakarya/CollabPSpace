import apiClient from "@/services/ApiClient";
import type { SendMessagePayload } from "../types/ChatTypes";

export const sendMessage = (projectId: number, payload: SendMessagePayload) => {
  return apiClient.post(`/projects/${projectId}/messages`, payload);
};
