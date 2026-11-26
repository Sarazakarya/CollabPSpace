export interface TeamMember {
  id: number;
  name: string;
  avatar_url: string | null;
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
  completion_percentage: number;
  total_tasks: number;
  completed_tasks: number;
  members: TeamMember[];
}

export interface ProjectTeamsResponse {
  success: boolean;
  message: string;
  data: ProjectTeam[];
}
