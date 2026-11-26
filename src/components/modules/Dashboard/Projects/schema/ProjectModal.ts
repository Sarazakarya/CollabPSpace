import { z } from "zod";
import { priorityModal, statusModal } from "../types/ProjesctModalType";

export const getProjectSchema = (t: (key: string) => string) =>
  z
    .object({
      name: z
        .string()
        .trim()
        .min(3, t("projects.validation.nameMin"))
        .max(80, t("projects.validation.nameMax")),

      description: z
        .string()
        .trim()
        .min(10, t("projects.validation.descriptionMin"))
        .max(500, t("projects.validation.descriptionMax")),

      start_date: z.string().min(1, t("projects.validation.startDate")),
      deadline: z.string().min(1, t("projects.validation.deadline")),
      status: z.enum(statusModal),
      priority: z.enum(priorityModal),
      teams: z.array(z.number()).min(1, t("projects.validation.teams")),
    })
    .refine((data) => data.deadline >= data.start_date, {
      path: ["deadline"],
      message: t("projects.validation.deadlineBeforeStart"),
    });

export type ProjectFormValues = z.infer<ReturnType<typeof getProjectSchema>>;
