import apiClient from "@/services/ApiClient";
import type { ProfileTasksResponse } from "../types/profile.types";

export async function getProfileTasks() {
  return apiClient.get<ProfileTasksResponse>("auth/profile/tasks");
}
