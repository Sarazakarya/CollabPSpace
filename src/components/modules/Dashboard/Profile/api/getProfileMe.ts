import apiClient from "@/services/ApiClient";
import type { ProfileMeResponse } from "../types/profile.types";

export async function getProfileMe() {
  return apiClient.get<ProfileMeResponse>("auth/me");
}
