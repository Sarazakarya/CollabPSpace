import apiClient from "@/services/ApiClient";
import type { AskAIBody } from "../types/AskAi";

export const askAI = async (
  prompt: string,
  projectId?: number,
): Promise<string> => {
  const res = (await apiClient.post("/ai/ask", {
    prompt,
    query: prompt,
    ...(projectId && { project_id: projectId }),
  })) as unknown as AskAIBody;

  const data = res.data;

  if (typeof data === "string") return data;

  return data?.answer || data?.response || data?.reply || data?.message || "";
};
