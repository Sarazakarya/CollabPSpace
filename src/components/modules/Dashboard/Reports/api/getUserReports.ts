import apiClient from "@/services/ApiClient";
import type { UserReportResponse } from "../types/report.types";
import type { ReportFilterParams } from "./getProjectReports";

export async function getUserReports(
  params?: ReportFilterParams & { period?: string }
) {
  return apiClient.get<UserReportResponse>("reports/users", { params });
}
