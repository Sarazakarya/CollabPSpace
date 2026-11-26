import apiClient from "@/services/ApiClient";
import type { ApiBody } from "../types/ChatTypes";

export const getUnreadCount = async (projectId: number): Promise<number> => {
  const res = (await apiClient.get(
    `/projects/${projectId}/messages/unread-count`,
  )) as unknown as ApiBody;

  const data = res?.data;
  return Number(typeof data === "number" ? data : (data?.unread_count ?? data?.count ?? 0));
};
