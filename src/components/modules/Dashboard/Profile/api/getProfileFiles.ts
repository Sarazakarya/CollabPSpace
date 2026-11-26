import apiClient from "@/services/ApiClient";
import type { ProfileFilesResponse } from "../types/profile.types";

export async function getProfileFiles() {
  return apiClient.get<ProfileFilesResponse>("auth/profile/files");
}

export async function downloadProfileFile(fileId: number) {
  return apiClient.get<Blob>(`files/${fileId}/download`, {
    responseType: "blob",
  });
}
