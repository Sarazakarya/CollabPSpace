import apiClient from "@/services/ApiClient";
import type { ProfileMeResponse } from "../types/profile.types";

export async function updateProfileFormData(formData: FormData) {
  return apiClient.post<ProfileMeResponse>("auth/profile", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export async function removeProfileAvatar() {
  return apiClient.delete<ProfileMeResponse>("auth/profile/avatar");
}
