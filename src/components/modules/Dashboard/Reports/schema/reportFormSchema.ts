import { z } from "zod";
import type { TFunction } from "i18next";

export const getReportFormSchema = (t: TFunction) =>
  z
    .object({
      reportType: z.enum(["projects", "tasks", "teams", "users"], {
        required_error: t(
          "reports.validation.reportTypeRequired",
          "Please select a report type"
        ),
      }),
      note: z.string().max(500).optional(),
      startDate: z
        .string()
        .min(1, t("reports.validation.startDateRequired", "Start date is required")),
      endDate: z
        .string()
        .min(1, t("reports.validation.endDateRequired", "End date is required")),
    })
    .refine(
      (data) => {
        if (!data.startDate || !data.endDate) return true;
        return new Date(data.endDate) >= new Date(data.startDate);
      },
      {
        message: t(
          "reports.validation.endDateAfterStart",
          "End date must be after start date"
        ),
        path: ["endDate"],
      }
    );

export type ReportFormValues = z.infer<ReturnType<typeof getReportFormSchema>>;
