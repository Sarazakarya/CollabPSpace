import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { isAxiosError } from "axios";

import { useApiMutation } from "@/shared/hooks/useApiMutation";
import { useAlert } from "@/shared/hooks/useAlert";
import type { ApiErrorResponse } from "@/shared/types/api-error-response";
import {
  getReportFormSchema,
  type ReportFormValues,
} from "../schema/reportFormSchema";
import { defaultReportFormValues } from "../types/report.types";
import { getProjectReports } from "../api/getProjectReports";
import { getTaskReports } from "../api/getTaskReports";
import { getTeamReports } from "../api/getTeamReports";
import { getUserReports } from "../api/getUserReports";

export const useSubmitReportForm = () => {
  const { t } = useTranslation();
  const { showAlert } = useAlert();

  const form = useForm<ReportFormValues>({
    resolver: zodResolver(getReportFormSchema(t)),
    defaultValues: defaultReportFormValues as ReportFormValues,
  });

  const { mutate, isPending } = useApiMutation({
    mutationFn: async (values: ReportFormValues) => {
      const params = {
        start_date: values.startDate,
        end_date: values.endDate,
      };

      switch (values.reportType) {
        case "projects":
          return getProjectReports(params);
        case "tasks":
          return getTaskReports(params);
        case "teams":
          return getTeamReports(params);
        case "users":
          return getUserReports(params);
      }
    },
    options: {
      onSuccess: () => {
        showAlert(
          "success",
          t(
            "reports.alerts.generateSuccess",
            "Detailed report generated successfully."
          )
        );
      },
      onError: (error) => {
        const message = isAxiosError<ApiErrorResponse>(error)
          ? error.response?.data?.message
          : undefined;

        showAlert(
          "error",
          message ||
            t(
              "reports.alerts.generateError",
              "Failed to generate detailed report."
            )
        );
      },
    },
  });

  const onSubmit = (values: ReportFormValues) => {
    mutate(values);
  };

  return {
    form,
    onSubmit,
    isPending,
  };
};
