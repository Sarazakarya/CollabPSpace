import apiClient from "@/services/ApiClient";
import type { ProjectReportResponse } from "../types/report.types";

export interface ReportFilterParams {
  project_id?: number | string;
  start_date?: string;
  end_date?: string;
}

export async function getProjectReports(params?: ReportFilterParams) {
  return apiClient.get<ProjectReportResponse>("reports/projects", { params });
}
