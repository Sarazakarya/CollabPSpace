export interface Project {
  id: number;
  name: string;
}

export interface TaskColumnProps {
  title: string;
  tasks: ProjectTask[];
  color: string;
  onAddTask: () => void;
  onEdit?: (task: ProjectTask) => void;
  onDelete?: (task: ProjectTask) => void;
}

export interface TaskBoardProps {
  columns: {
    Pending: {
      name: string;
      count: number;
      tasks: ProjectTask[];
    };
    "In Progress": {
      name: string;
      count: number;
      tasks: ProjectTask[];
    };
    "In Review": {
      name: string;
      count: number;
      tasks: ProjectTask[];
    };
    Completed: {
      name: string;
      count: number;
      tasks: ProjectTask[];
    };
  };
  onAddTask: () => void;
  search: string;
  onEdit?: (task: ProjectTask) => void;
  onDelete?: (task: ProjectTask) => void;
}

export interface TaskCardProps {
  task: ProjectTask;
  onEdit?: (task: ProjectTask) => void;
  onDelete?: (task: ProjectTask) => void;
}

export interface ProjectTask {
  id: number;
  name: string;
  description: string | null;
  priority: "Low" | "Medium" | "High" | "Critical";
  status: string;
  assigned_to: number | null;
  due_date: string | null;
}

export interface CreateTaskModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: CreateTaskFormValues) => void;
  isPending?: boolean;
  task?: ProjectTask | null;
  projectId: number;
}

export interface GetProjectTasksParams {
  project_id: number;
  per_page?: number;
}

export interface ProjectTasksResponse {
  success: boolean;
  message: string;
  data: {
    data: ProjectTask[];
    links: {
      first: string | null;
      last: string | null;
      prev: string | null;
      next: string | null;
    };
    meta: {
      current_page: number;
      per_page: number;
      total: number;
      last_page: number;
    };
  };
}

export interface CreateTaskFormValues {
  name: string;
  description: string;
  project_id: number;
  priority: "Low" | "Medium" | "High" | "Critical";
  status: "Pending" | "In Progress" | "In Review" | "Completed";
  assigned_to: number | null;
  due_date: string;
}

export interface CreateTaskPayload {
  name: string;
  description: string;
  project_id: number;
  team_id: number;
  assigned_to: number | null;
  priority: "Low" | "Medium" | "High" | "Critical";
  status: "Pending" | "In Progress" | "In Review" | "Completed";
  due_date: string | null;
}

export interface DeleteTaskItem {
  id: number;
  name: string;
}

export interface TasksLocationState {
  project: Project;
}


export interface UpdateTaskVariables {
  taskId: number;
  values: CreateTaskFormValues;
}

export interface UpdateTaskProps {
  projectId: number;
  onSuccess: () => void;
}
