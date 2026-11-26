import { z } from "zod";
import type { TFunction } from "i18next";

export const getProfileSettingsSchema = (t: TFunction) =>
  z.object({
    name: z.string().min(1, t("profile.validation.nameRequired")),
    email: z
      .string()
      .email(t("profile.validation.emailInvalid"))
      .optional()
      .or(z.literal("")),
    phone: z.string().optional(),
    status: z.string().optional(),
    job_title: z.string().optional(),
    years_of_experience: z.coerce
      .number()
      .min(0, t("profile.validation.yearsMin"))
      .optional(),
    current_team_project: z.string().optional(),
  });

export type ProfileSettingsFormValues = z.infer<
  ReturnType<typeof getProfileSettingsSchema>
>;
