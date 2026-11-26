import { z } from "zod";
import type { TFunction } from "i18next";

// built with t so the error messages follow the current language
export const createMeetingSchema = (t: TFunction) =>
  z
    .object({
      project_id: z.number().min(1, t("meetings.validation.project")),
      title: z
        .string()
        .trim()
        .min(3, t("meetings.validation.title"))
        .max(120, t("meetings.validation.titleMax")),
      description: z.string().trim().max(500, t("meetings.validation.descriptionMax")),
      meeting_date: z.string().min(1, t("meetings.validation.date")),
      start_time: z.string().min(1, t("meetings.validation.startTime")),
      end_time: z.string().min(1, t("meetings.validation.endTime")),
      meeting_link: z
        .string()
        .trim()
        .refine((value) => value === "" || /^https?:\/\//i.test(value), t("meetings.validation.link")),
      attendee_ids: z.array(z.number()),
    })
    .refine((data) => !data.start_time || !data.end_time || data.end_time > data.start_time, {
      path: ["end_time"],
      message: t("meetings.validation.endBeforeStart"),
    });

export type MeetingFormValues = z.infer<ReturnType<typeof createMeetingSchema>>;

export const DEFAULT_MEETING_VALUES: MeetingFormValues = {
  project_id: 0,
  title: "",
  description: "",
  meeting_date: "",
  start_time: "",
  end_time: "",
  meeting_link: "",
  attendee_ids: [],
};
