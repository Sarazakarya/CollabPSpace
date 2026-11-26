import apiClient from "@/services/ApiClient";
import type { ApiBody } from "../types/ChatTypes";

export const uploadChatFile = async (projectId: number, file: File): Promise<number> => {
  const form = new FormData();
  form.append("file", file);
  form.append("project_id", String(projectId));

  const res = (await apiClient.post("/files", form)) as unknown as ApiBody;
  return res?.data?.id ?? res?.data?.file?.id;
};
