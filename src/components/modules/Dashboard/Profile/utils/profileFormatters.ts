import type { ProfileTab } from "../types/profile.types";

export const formatJoinedDate = (dateStr?: string): string => {
  if (!dateStr) return "Apr 2022";
  const parsed = new Date(dateStr);
  if (Number.isNaN(parsed.getTime())) return dateStr;
  return parsed.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
};

export const getTaskProgressPercentage = (
  status: string,
  progress?: number,
): number => {
  if (typeof progress === "number") return Math.min(100, Math.max(0, progress));
  switch (status) {
    case "Completed":
      return 100;
    case "In Review":
      return 75;
    case "In Progress":
      return 50;
    default:
      return 25;
  }
};

export const tabs: { key: ProfileTab; label: string }[] = [
  { key: "overview", label: "profile.tabs.overview" },
  { key: "tasks", label: "profile.tabs.tasks" },
  { key: "files", label: "profile.tabs.files" },
  { key: "settings", label: "profile.tabs.settings" },
];
