import { CheckCircle2, ClipboardList, Loader } from "lucide-react";

export const toneMap = {
  brand: { color: "ds-text-brand", bg: "ds-bg-blue-soft" },
  info: { color: "ds-text-info", bg: "ds-bg-blue-soft" },
  success: { color: "ds-text-success", bg: "ds-bg-green-soft" },
  warning: { color: "ds-text-warning", bg: "ds-bg-yellow-soft" },
  danger: { color: "ds-text-danger", bg: "ds-bg-danger-soft" },
  purple: { color: "ds-text-purple", bg: "ds-bg-purple-soft" },
  pink: { color: "ds-text-pink", bg: "ds-bg-pink-soft" },
  teal: { color: "text-[#14b8a6]", bg: "bg-[#14b8a6]/10" },
} as const;

export type Tone = keyof typeof toneMap;

export const stats = [
  {
    key: "pending",
    value: 32,
    total: 94,
    trend: "+9%",
    tone: "warning" as Tone,
    icon: ClipboardList,
  },
  {
    key: "inProgress",
    value: 40,
    total: 94,
    trend: "+12%",
    tone: "info" as Tone,
    icon: Loader,
  },
  {
    key: "completed",
    value: 22,
    total: 94,
    trend: "+16%",
    tone: "success" as Tone,
    icon: CheckCircle2,
  },
];

export const completion = { value: 33, trend: "+22%" };

export const overview = [
  { month: "jan", value: 14000 },
  { month: "feb", value: 18500 },
  { month: "mar", value: 7000 },
  { month: "apr", value: 12000 },
  { month: "may", value: 8000 },
  { month: "jun", value: 19500 },
];

export const activeProjects = [
  { name: "Alpha", done: 100, total: 120, tone: "purple" as Tone },
  { name: "Supat3o", done: 52, total: 120, tone: "info" as Tone },
];

export const recentFiles = [
  {
    name: "UX_Research_Summary.pdf",
    by: "Mohamed Wahib",
    time: "14:00",
    tone: "danger" as Tone,
  },
  {
    name: "Dashboard_Layout_React.jsx",
    by: "Wahib salem",
    time: "14:00",
    tone: "info" as Tone,
  },
  {
    name: "Database_Schema_v2.sql",
    by: "Mohamed Nasir",
    time: "14:00",
    tone: "brand" as Tone,
  },
];

export const tasks = [
  {
    title: "Creat Wireframes",
    priority: "high" as const,
    due: null,
    progress: 82,
  },
  {
    title: "User Research",
    priority: "medium" as const,
    due: "2026-12-18",
    progress: 52,
  },
  {
    title: "Design System Updates",
    priority: "low" as const,
    due: "2026-12-20",
    progress: 42,
  },
];

export const teams = [
  { name: "Mohamed Wahib", leader: true, done: 12, total: 14 },
  { name: "Sara Hassan", leader: false, done: 10, total: 16 },
  { name: "Ali Mohamed", leader: false, done: 4, total: 12 },
  { name: "Khalid Mousa", leader: false, done: 11, total: 16 },
  { name: "Mahmoud Salah", leader: false, done: 9, total: 12 },
  { name: "Ahmed Mohamed", leader: false, done: 6, total: 12 },
];

export const meetings = [
  {
    title: "Design Review",
    date: null,
    time: "14:00 - 15:00",
    extra: 3,
    people: ["MW", "SH", "AM"],
  },
  {
    title: "Sprint Planning Meeting",
    date: "2026-12-17",
    time: "14:00 - 15:00",
    extra: 4,
    people: ["KM", "MS", "AM"],
  },
  {
    title: "UX Feedback Session",
    date: "2026-12-19",
    time: "14:00 - 15:00",
    extra: 6,
    people: ["SH", "MW", "KM"],
  },
];
