import apiClient from "@/services/ApiClient";
import type { CreateProjectPayload } from "../types/ProjesctModalType";

export async function createProjectModal(payload: CreateProjectPayload) {
  return apiClient.post("projects", payload);
}
