
export type Priority = "high" | "medium" | "low" | "critical";

export type ProjectStatus =
  | "In Progress"
  | "Pending"
  | "On Hold"
  | "Completed";

export type StatusFilter = ProjectStatus | "all";

export type SortOrder = "newest" | "oldest";

export type TaskStatus =
  | "todo"
  | "in_progress"
  | "in_review"
  | "completed";

export interface UserLite {
  id: number;
  name: string;
  avatar_url: string | null;
}

export interface TeamMember extends UserLite {
  role_in_team: string;
  is_leader: boolean;
  tasks_completed: number;
  tasks_total: number;
  tasks_ratio: string;
  progress_percentage: number;
}

export interface ProjectTeam {
  id: number;
  name: string;
  completion_percentage?: number;
  total_tasks?: number;
  completed_tasks?: number;
  members?: TeamMember[];
}

export interface Project {
  id: number;
  name: string;
  description: string;
  type: string;
  status: ProjectStatus;
  priority: Priority;
  start_date: string;
  deadline: string;
  files_count: number;
  completion_percentage: number;
  due_progress: number;
  total_tasks: number;
  pending_tasks: number;
  in_progress_tasks: number;
  completed_tasks: number;
  teams: ProjectTeam[];
  overview: { month: string; value: number }[];
}

export interface Task {
  id: number;
  title: string;
  description: string;
  priority: Priority;
  status: TaskStatus;
  progress: number | null;
  due_date: string;
  assignees: UserLite[];
  comments_count: number;
  attachments_count: number;
  reviewer: string | null;
}

export interface ProjectsFilters {
  search?: string;
  status?: StatusFilter;
  sort?: SortOrder;
}

export interface PaginationMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface GetProjectsParams {
  search?: string;
  status?: ProjectStatus;
  sort?: SortOrder;
  page: number;
  per_page: number;
  [key: string]: unknown;
}

export interface ProjectApi {
  id: number;
  name: string;
  description: string | null;
  start_date: string;
  deadline: string;
  status: ProjectStatus;
  priority: string;
  progress_percentage: number;
  files_count: number;
  teams: {
    id: number;
    name: string;
  }[];
  created_at: string;
}

export interface ProjectsResponse {
  success: boolean;
  message: string;
  data: {
    data: ProjectApi[];
    meta: PaginationMeta;
    links: {
      first: string;
      last: string;
      prev: string | null;
      next: string | null;
    };
  };
}


export interface TableProps {
  projects: Project[];
  meta?: PaginationMeta;
  isLoading?: boolean;
  isError?: boolean;
  onPageChange?: (page: number) => void;
}


export interface ProjectToolBarProps {
  search: string;
  status: StatusFilter;
  sort: SortOrder;
  onSearchChange: (v: string) => void;
  onStatusChange: (v: StatusFilter) => void;
  onSortChange: (v: SortOrder) => void;
}
