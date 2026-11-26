import { isAxiosError } from "axios";
import type { ApiErrorResponse } from "@/shared/types/api-error-response";

export const getLocale = (lang: string) => (lang.startsWith("ar") ? "ar-EG" : "en-US");

export const formatTime = (iso: string, lang: string) =>
  new Date(iso).toLocaleTimeString(getLocale(lang), {
    hour: "numeric",
    minute: "2-digit",
  });

export const getInitials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");

// message coming from the backend (validation / server error), if any
export const getApiErrorMessage = (error: unknown) =>
  isAxiosError<ApiErrorResponse>(error) ? error.response?.data?.message : undefined;
