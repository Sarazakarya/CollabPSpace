import apiClient from "@/services/ApiClient";
import type { GetProjectTasksParams, ProjectTasksResponse } from "../types/Taskstype";



export const getProjectTasks = ({
  project_id,
  per_page = 100,
}: GetProjectTasksParams) => {
  return apiClient.get<ProjectTasksResponse>("/tasks", {
    params: {
      project_id,
      per_page,
    },
  });
};
