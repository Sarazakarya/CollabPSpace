import apiClient from "@/services/ApiClient";
import type { ApiBody, ChatProject } from "../types/ChatTypes";
import { extractList } from "../data/chatMappers";

export const getChatProjects = async (): Promise<ChatProject[]> => {
  const res = (await apiClient.get("/projects?per_page=50")) as unknown as ApiBody;
  return extractList(res).map((p) => ({ id: p.id, name: p.name }));
};
