import apiClient from "@/services/ApiClient";
import type {
  GetProjectsParams,
  ProjectsResponse,
} from "../types/Projecttypes";
export async function getProjects(
  params: GetProjectsParams,
): Promise<ProjectsResponse> {
  const { ...rest } = params;

  return apiClient.get<ProjectsResponse>("projects", {
    ...rest,
  });
}
