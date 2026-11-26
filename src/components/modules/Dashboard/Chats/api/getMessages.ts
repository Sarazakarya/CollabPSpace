import apiClient from "@/services/ApiClient";
import type { ApiBody, ChatMessage } from "../types/ChatTypes";
import { extractList, toMessage } from "../data/chatMappers";

export const getMessages = async (projectId: number): Promise<ChatMessage[]> => {
  const res = (await apiClient.get(
    `/projects/${projectId}/messages?per_page=50`,
  )) as unknown as ApiBody;

  return extractList(res).map(toMessage);
};
