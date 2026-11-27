import type { Tone } from "../../utils/DashboardData";

export type DashboardResponse = {
  success: boolean;
  data: {
    overview: {
      projects: {
        total: number;
        active: number;
        completed: number;
        average_progress: number;
      };
      tasks: {
        total: number;
        pending: number;
        in_progress: number;
        in_review: number;
        completed: number;
        pending_percentage: number;
        in_progress_percentage: number;
        in_review_percentage: number;
        completed_percentage: number;
        overdue: number;
        assigned_to_me: number;
        completion_rate: number;
        by_priority: {
          low: number;
          medium: number;
          high: number;
          critical: number;
        };
      };
      meetings: {
        upcoming_count: number;
      };
      teams: {
        total: number;
      };
    };

    project_overview: {
      period: string;
      year: number;
      from: string;
      to: string;
      group_by: string;
      data: {
        label: string;
        month: string;
        month_number: number;
        year: number;
        is_future: boolean;
        projects: number;
        created_tasks: number;
        completed_tasks: number;
      }[];
    };

    active_projects: {
      items: {
        id: number;
        name: string;
        progress: number;
        tasks_total: number | null;
        tasks_completed: number | null;
      }[];
      pagination: {
        current_page: number;
        per_page: number;
        total: number;
      };
    };

    tasks: {
      items: {
        id: number;
        name: string;
        priority: "low" | "medium" | "high" | "critical";
        status: "pending" | "in_progress" | "in_review" | "completed";
        status_label: string;
        due_date: string;
        project: {
          id: number;
          name: string;
        };
        assignee: {
          id: number;
          name: string;
          avatar_url: string | null;
        } | null;
      }[];
      pagination: {
        current_page: number;
        per_page: number;
        total: number;
      };
    };

    teams: {
      items: {
        id: number;
        name: string;
        description: string;
        members_count: number;
        projects_count: number;
      }[];
      pagination: {
        current_page: number;
        per_page: number;
        total: number;
      };
    };

    upcoming_meetings: {
      items: {
        id: number;
        title: string;
        date: string;
        start_time: string;
        end_time: string;
        meeting_link: string;
        project: {
          id: number;
          name: string;
        };
        creator: {
          id: number;
          name: string;
        };
        participants: {
          id: number;
          name: string;
          avatar_url: string | null;
        }[];
      }[];
    };

    recent_files: {
      items: {
        id: number;
        name: string;
        mime_type: string;
        file_size_formatted: string;
        download_url: string;
        uploaded_by: {
          id: number;
          name: string;
        };
        project: {
          id: number;
          name: string;
        };
        created_at: string;
      }[];
      pagination: {
        current_page: number;
        per_page: number;
        total: number;
      };
    };

    recent_activity: {
      items: {
        id: number;
        category: string;
        action: string;
        description: string;
        user: {
          id: number;
          name: string;
          avatar_url: string | null;
        };
        created_at: string;
      }[];
      pagination: {
        current_page: number;
        per_page: number;
        total: number;
      };
    };
  };
};

export type StatsRowProps = {
  data: DashboardResponse["data"]["overview"];
};

export type RecentProps = {
  id: number;
  name: string;
  mime_type: string;
  file_size_formatted: string;
  download_url: string;
  uploaded_by: {
    id: number;
    name: string;
  };
  project: {
    id: number;
    name: string;
  };
  created_at: string;
}[];



export type Task = {
  id: number;
  name: string;
  priority: "low" | "medium" | "high" | "critical";
  status: "pending" | "in_progress" | "in_review" | "completed";
  status_label: string;
  due_date: string;
  project: {
    id: number;
    name: string;
  };
  assignee: {
    id: number;
    name: string;
    avatar_url: string | null;
  } | null;
};

export type TaskProps = {
  data: Task[];
};

export type Meeting = {
  id: number;
  title: string;
  date: string;
  start_time: string;
  end_time: string;
  meeting_link: string;
  project: {
    id: number;
    name: string;
  };
  creator: {
    id: number;
    name: string;
  };
  participants: {
    id: number;
    name: string;
    avatar_url: string | null;
  }[];
};

export type MattingsProps = {
  data: Meeting[];
};

export interface MeetingItemProps {
  title: string;
  date: string | null;
  time: string;
  extra: number;
  people: {
    id: number;
    name: string;
    avatar_url: string | null;
  }[];
}

export interface ProjectItemProps {
  name: string;
  done: number;
  total: number;
  tone: Tone;
}


export type TaskItemProps = {
  title: string;
  priority: "low" | "medium" | "high" | "critical";
  due: string;
};

export interface TeamRowProps {
  name: string;
  membersCount: number;
  projectsCount: number;
}


type Team = {
  id: number;
  name: string;
  description: string;
  members_count: number;
  projects_count: number;
};

export type TeamTaskProps = {
  data: Team[];
};