export type ReportTypeOption = "projects" | "tasks" | "teams" | "users";

export interface KpiMetric {
  percentage: number;
  changeFromLastMonth: number;
}

export interface ChartDataPoint {
  label: string;
  value: number;
}

export interface DetailedReportFormValues {
  reportType: ReportTypeOption | "";
  note?: string;
  startDate: string;
  endDate: string;
}

export const defaultReportFormValues: DetailedReportFormValues = {
  reportType: "",
  note: "",
  startDate: "",
  endDate: "",
};

export interface ProjectReportResponse {
  data: {
    completion_rate?: number;
    change_percentage?: number;
    progress_timeline?: { month: string; progress: number }[];
    projects?: { id: number; name: string }[];
  };
}

export interface TaskReportResponse {
  data: {
    completion_rate?: number;
    change_percentage?: number;
    completion_vs_deadline?: { month: string; rate: number }[];
  };
}

export interface TeamReportResponse {
  data: {
    activity_rate?: number;
    change_percentage?: number;
  };
}

export interface UserReportResponse {
  data: {
    productivity_score?: number;
    activity_timeline?: { label: string; score: number }[];
  };
}



export interface ProjectsProgressAreaChartProps {
  title: string;
  data: ChartDataPoint[];
  selectedProject: string;
  onProjectChange: (value: string) => void;
  projects?: { id: number; name: string }[];
  isLoading?: boolean;
}


export interface StatKpiCardProps {
  title: string;
  percentage?: number;
  delta?: number;
  subtitle?: string;
  isLoading?: boolean;
}

export interface TaskCompletionBarChartProps {
  title: string;
  data: ChartDataPoint[];
  isLoading?: boolean;
}



export interface WorkerActivityLineChartProps {
  title: string;
  data: ChartDataPoint[];
  period: string;
  onPeriodChange: (period: string) => void;
  isLoading?: boolean;
}

export interface ReportsChartsSectionProps {
  taskSeries: ChartDataPoint[];
  isTasksLoading?: boolean;
  projectSeries: ChartDataPoint[];
  isProjectsLoading?: boolean;
  workerSeries: ChartDataPoint[];
  isUsersLoading?: boolean;
  selectedProject: string;
  onProjectChange: (val: string) => void;
  projectsList?: { id: number; name: string }[];
  activityPeriod: string;
  onPeriodChange: (val: string) => void;
}


// pages
export interface ReportsStatsGridProps {
  taskCompletionRate?: number;
  taskDelta?: number;
  isTasksLoading?: boolean;
  projectCompletionRate?: number;
  projectDelta?: number;
  isProjectsLoading?: boolean;
  teamActivityRate?: number;
  teamDelta?: number;
  isTeamsLoading?: boolean;
}