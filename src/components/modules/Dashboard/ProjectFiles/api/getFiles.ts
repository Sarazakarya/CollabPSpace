import apiClient from "@/services/ApiClient";
import type { FilesResponse } from "../types/FileType";

export const getFiles = (projectId: string) => {
  return apiClient.get<FilesResponse>(
    `/files?project_id=${projectId}&per_page=15`,
  );
};
