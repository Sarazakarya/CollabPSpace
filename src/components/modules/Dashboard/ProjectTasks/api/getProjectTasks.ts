import apiClient from "@/services/ApiClient";
import type { ProjectTasksResponse } from "../types/TaskType";

export const getProjectTasks = (id: string) => {
  return apiClient.get<ProjectTasksResponse>(`/projects/${id}/tasks/kanban`);
};
