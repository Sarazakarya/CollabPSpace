import apiClient from "@/services/ApiClient";
import type { TeamsListResponse } from "../types/projectTeams";

export async function getListTeams() {
  return await apiClient.get<TeamsListResponse>("/teams?page=1&per_page=15");
}
