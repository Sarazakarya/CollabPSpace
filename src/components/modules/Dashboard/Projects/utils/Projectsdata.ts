import type {
  Priority,
  ProjectStatus,
  StatusFilter,
} from "../types/Projecttypes";

export const initials = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

export const fmtDate = (iso: string, lang: string) =>
  new Date(iso).toLocaleDateString(lang, {
    month: "short",
    day: "numeric",
  });

export const priorityBadge: Record<Priority, string> = {
  high: "ds-badge-danger",
  medium: "ds-badge-warning",
  low: "ds-badge-success",
  critical: "ds-badge-danger",
};

export const statusColor: Record<ProjectStatus, string> = {
  "In Progress": "ds-text-info",
  Pending: "ds-text-warning",
  "On Hold": "ds-text-warning",
  Completed: "ds-text-success",
};

export const tabs = [
  { key: "overview", path: "", disabled: false },
  { key: "tasks", path: "tasks", disabled: false },
  { key: "teams", path: "teams", disabled: true },
  { key: "files", path: "files", disabled: true },
];

export const columns = [
  "name",
  "startDate",
  "deadline",
  "status",
  "files",
  "team",
  "priority",
];

export const priorityStyle = {
  high: "bg-red-500/10 text-red-600 dark:text-red-400",
  medium: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  low: "bg-green-500/10 text-green-600 dark:text-green-400",
  critical: "bg-red-500/10 text-red-600 dark:text-red-400",
} as const;

export const statusStyle: Record<ProjectStatus, string> = {
  "In Progress": "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  Pending: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
  "On Hold": "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  Completed: "bg-green-500/10 text-green-600 dark:text-green-400",
};
export const statusOptions: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "All Statuses" },
  { value: "In Progress", label: "In Progress" },
  { value: "Pending", label: "Pending" },
  { value: "On Hold", label: "On Hold" },
  { value: "Completed", label: "Completed" },
];
