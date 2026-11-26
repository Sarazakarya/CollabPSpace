import apiClient from "@/services/ApiClient";
import type { TaskReportResponse } from "../types/report.types";
import type { ReportFilterParams } from "./getProjectReports";

export async function getTaskReports(params?: ReportFilterParams) {
  return apiClient.get<TaskReportResponse>("reports/tasks", { params });
}
