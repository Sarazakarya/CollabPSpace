import apiClient from "@/services/ApiClient";
import type { ProjectOverviewResponse } from "../types/overviewtype";
export const getProjectOverview = (id: string) => {
  return apiClient.get<ProjectOverviewResponse>(`/projects/${id}/overview`);
};
