import apiClient from "@/services/ApiClient";
import type { UploadFilePayload } from "../types/FileType";


export const uploadFile = (data: UploadFilePayload) => {
  const formData = new FormData();

  formData.append("name", data.name);
  formData.append("project_id", String(data.project_id));
  formData.append("file", data.file);

  return apiClient.upload("/files", formData);
};
