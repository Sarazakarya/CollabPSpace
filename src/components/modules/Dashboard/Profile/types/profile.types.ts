export type ProfileTab = "overview" | "tasks" | "files" | "settings";

export interface UserActivityItem {
  id: number | string;
  description: string;
  created_at?: string;
  time_ago?: string;
}

export interface UserProfile {
  id: number;
  name: string;
  email: string;
  phone?: string | null;
  job_title?: string | null;
  years_of_experience?: number | null;
  avatar_url?: string | null;
  status?: string;
  bio?: string | null;
  joined_at?: string;
  completed_tasks_count?: number;
  hours_worked?: number;
  current_team_project?: string;
  recent_activities?: UserActivityItem[];
}

export interface ProfileMeResponse {
  success: boolean;
  message: string;
  data: {
    user: UserProfile;
    stats: {
      completed_tasks: number;
      total_tasks: number;
      hours_worked: number;
    };
    recent_activities: unknown[];
    teams: unknown[];
    projects: unknown[];
  };
}

export interface ProfileTaskItem {
  id: number;
  name: string;
  status: "Pending" | "In Progress" | "In Review" | "Completed" | string;
  progress?: number;
  due_date?: string;
}

export interface ProfileTasksResponse {
  success: boolean;
  data: ProfileTaskItem[];
}

export interface ProfileFileItem {
  id: number;
  name: string;
  size_formatted?: string;
  mime_type?: string;
  created_at?: string;
  time_ago?: string;
  uploader?: {
    id: number;
    name: string;
  };
}

export interface ProfileFilesResponse {
  success: boolean;
  data: ProfileFileItem[];
}

export interface UpdateProfileFormValues {
  name: string;
  email?: string;
  phone?: string;
  status?: string;
  job_title?: string;
  years_of_experience?: number | string;
  current_team_project?: string;
}

export const defaultProfileSettingsValues: UpdateProfileFormValues = {
  name: "",
  email: "",
  phone: "",
  status: "active",
  job_title: "",
  years_of_experience: 0,
  current_team_project: "",
};

// Pages

export interface ProfileFileCardProps {
  file: ProfileFileItem;
}

export interface ProfileFilesTabProps {
  files?: ProfileFileItem[];
  isLoading?: boolean;
}

export interface ProfileHeaderBannerProps {
  user?: UserProfile;
  isLoading?: boolean;
  activeTab: ProfileTab;
  onTabChange: (tab: ProfileTab) => void;
  onAvatarChange?: (file: File) => void;
  isUploadingAvatar?: boolean;
}

export interface ProfileMetricCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  iconBgClass: string;
  isLoading?: boolean;
}

export interface ProfileOverviewTabProps {
  user?: UserProfile;
  isLoading?: boolean;
}

export interface ProfileSettingsTabProps {
  user?: UserProfile;
  onRefetch?: () => void;
}
export interface ProfileTaskProgressRowProps {
  task: ProfileTaskItem;
  variant: "todo" | "done";
}
export interface ProfileTasksTabProps {
  tasks?: ProfileTaskItem[];
  isLoading?: boolean;
}
