import type { ProjectFormValues } from "../schema/ProjectModal";

export const statusModal = [
  "In Progress",
  "Pending",
  "On Hold",
  "Completed",
] as const;

export const priorityModal = ["Low", "Medium", "High", "Critical"] as const;

export interface TeamOption {
  id: number;
  name: string;
  members: number;
}

export const defaultModal: ProjectFormValues = {
  name: "",
  description: "",
  start_date: "",
  deadline: "",
  status: "Pending",
  priority: "Medium",
  teams: [],
};

export interface ProjectModal {
  open: boolean;
  setOpen: (open: boolean) => void;
  teams?: TeamOption[];
  isLoading: boolean;
}

export interface ProjectMemberPayload {
  user_id: number;
  role: string;
}

export interface CreateProjectPayload {
  name: string;
  description: string;
  start_date: string;
  deadline: string;
  priority: "Low" | "Medium" | "High" | "Critical";
  status: "In Progress" | "Pending" | "On Hold" | "Completed";
  teams: number[];
  members: ProjectMemberPayload[];
}
