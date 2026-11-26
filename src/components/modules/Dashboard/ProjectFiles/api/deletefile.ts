import apiClient from "@/services/ApiClient";

export const deleteFile = (fileId: number) => {
  return apiClient.delete(`/files/${fileId}`);
};
