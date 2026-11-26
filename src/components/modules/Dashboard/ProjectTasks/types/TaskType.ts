export interface ProjectTasksResponse {
  success: boolean;
  message: string;
  data: {
    project: {
      id: number;
      name: string;
      progress_percentage: number;
    };
    total_tasks: number;
    columns: {
      Pending: TaskColumn;
      "In Progress": TaskColumn;
      "In Review": TaskColumn;
      Completed: TaskColumn;
    };
  };
}

export interface TaskColumn {
  name: string;
  count: number;
  tasks: ProjectTask[];
}

export interface ProjectTask {
  id: number;
  name: string;
  description: string | null;
  priority: "Low" | "Medium" | "High" | "Critical";
  status: "Pending" | "In Progress" | "In Review" | "Completed";
  due_date: string | null;
  completed_at: string | null;
  hours_spent: number;
  project_id: number;
  team_id: number | null;
  assigned_to: number;
  created_by: number;
  project: {
    id: number;
    name: string;
  };
  team: {
    id: number;
    name: string;
  } | null;
  assignee: {
    id: number;
    name: string;
    email: string;
    avatar_url: string | null;
    job_title: string | null;
  };
  creator: {
    id: number;
    name: string;
    email: string;
  };
  attachments_count: number;
  created_at: string;
  updated_at: string;
}

export interface CreateTaskPayload {
  name: string;
  description: string;
  project_id: number;
  team_id: number | null;
  assigned_to: number | null;
  priority: "Low" | "Medium" | "High" | "Critical";
  status: "Pending" | "In Progress" | "In Review" | "Completed";
  due_date: string | null;
}

export interface TaskFormValues {
  name: string;
  description: string;
  priority: "Low" | "Medium" | "High" | "Critical";
  status: "Pending" | "In Progress" | "In Review" | "Completed";
  team_id: number | null;
  assigned_to: number | null;
  due_date: string;
}
