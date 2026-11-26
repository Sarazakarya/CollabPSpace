import { isAxiosError } from "axios";
import type { ApiErrorResponse } from "@/shared/types/api-error-response";
import type { MeetingFormValues } from "./meetingSchema";


export const MEETINGS_PATH = "/meetings";


export const START_HOUR = 8;
export const END_HOUR = 18;

export const getLocale = (lang: string) => (lang.startsWith("ar") ? "ar-EG" : "en-US");

export const startOfWeek = (date: Date, weekStartsOn = 1) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - ((d.getDay() - weekStartsOn + 7) % 7));
  return d;
};

export const addDays = (date: Date, days: number) => {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
};


export const toYMD = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
    date.getDate(),
  ).padStart(2, "0")}`;

export const formatDateLong = (ymd: string, lang: string) =>
  new Date(`${ymd.slice(0, 10)}T00:00:00`).toLocaleDateString(getLocale(lang), {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

export const getHour = (time: string) => Number(time.slice(0, 2));

export const clampHour = (hour: number) => Math.min(Math.max(hour, START_HOUR), END_HOUR);

export const formatTime = (time: string, lang: string) =>
  new Date(`1970-01-01T${time.slice(0, 8)}`).toLocaleTimeString(getLocale(lang), {
    hour: "numeric",
    minute: "2-digit",
  });

export const formatHour = (hour: number, lang: string) =>
  new Date(1970, 0, 1, hour).toLocaleTimeString(getLocale(lang), { hour: "numeric" });

export const toApiTime = (time: string) => (time.length === 5 ? `${time}:00` : time);

export const getInitials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");


export const getApiErrorMessage = (error: unknown) =>
  isAxiosError<ApiErrorResponse>(error) ? error.response?.data?.message : undefined;

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