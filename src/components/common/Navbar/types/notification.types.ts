export type NotificationData = {
  type: string;
  title: string;
  message: string;
  meeting_id?: number;
  meeting_title?: string;
  task_id?: number;
  task_name?: string;
  project_id?: number;
  project_name?: string;
  host_id?: number;
  host_name?: string;
  assigned_by_id?: number;
  assigned_by_name?: string;
  sender_id?: number;
  sender_name?: string;
  message_id?: number;
  start_time?: string;
};

export type Notification = {
  id: string;
  type: string;
  title: string;
  message: string;
  data: NotificationData;
  is_read: boolean;
  read_at: string | null;
  created_at: string;
};

export type NotificationsResponse = {
  success: boolean;
  message: string;
  data: Notification[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    unread_count: number;
  };
};

export type UnreadCountResponse = {
  success: boolean;
  message: string;
  data: {
    unread_count: number;
  };
};

export type MarkAllReadResponse = {
  success: boolean;
  message: string;
  data: {
    marked_count: number;
  };
};
