import type { ProfileTab, ProfileTaskItem, UserActivityItem } from "../types/profile.types";

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

export const FALLBACK_ACTIVITIES: UserActivityItem[] = [
  {
    id: 1,
    description: "Completed task User Research Analysis",
    time_ago: "1h ago",
  },
  {
    id: 2,
    description: "Updated Design System Updates",
    time_ago: "4h ago",
  },
  {
    id: 3,
    description: "Joined meeting Sprint Planning Meeting",
    time_ago: "1d ago",
  },
  {
    id: 4,
    description: "Commented on Dashboard Layout Design",
    time_ago: "2d ago",
  },
];

export const FALLBACK_TASKS: ProfileTaskItem[] = [
  { id: 1, name: "Create user interface", status: "In Progress", progress: 70 },
  { id: 2, name: "Creat Wireframes", status: "In Progress", progress: 45 },
  { id: 3, name: "Create user flow", status: "Pending", progress: 65 },
  { id: 4, name: "Design log in screen", status: "In Review", progress: 80 },
  { id: 5, name: "Update design system", status: "Completed", progress: 100 },
  {
    id: 6,
    name: "Create information architected",
    status: "Completed",
    progress: 100,
  },
  { id: 7, name: "Make survey", status: "Completed", progress: 100 },
  { id: 8, name: "Creat Wireframes", status: "Completed", progress: 100 },
  { id: 9, name: "Creat Wireframes", status: "Completed", progress: 100 },
];