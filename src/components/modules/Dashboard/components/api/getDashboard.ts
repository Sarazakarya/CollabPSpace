import apiClient from "@/services/ApiClient";
import type { DashboardResponse } from "../types/DashboardType";

export async function getDashboard() {
  return await apiClient.get<DashboardResponse>("/dashboard");
}
