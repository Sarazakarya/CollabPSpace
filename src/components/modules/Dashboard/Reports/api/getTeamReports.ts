import apiClient from "@/services/ApiClient";
import type { TeamReportResponse } from "../types/report.types";
import type { ReportFilterParams } from "./getProjectReports";

export async function getTeamReports(params?: ReportFilterParams) {
  return apiClient.get<TeamReportResponse>("reports/teams", { params });
}
