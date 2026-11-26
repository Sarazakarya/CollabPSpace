import apiClient from "@/services/ApiClient";
import type { ProjectTeamsResponse } from "../types/TeamType";

export const getProjectTeams = (projectId: string) => {
  return apiClient.get<ProjectTeamsResponse>(`/projects/${projectId}/teams`);
};
