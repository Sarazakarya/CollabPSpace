import type { Priority, ProjectStatus } from "../types/Projecttypes";

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
