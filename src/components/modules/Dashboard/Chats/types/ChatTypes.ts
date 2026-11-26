export type ApiBody = { data?: any };

export interface ChatProject {
  id: number;
  name: string;
}

export interface ChatSender {
  id: number;
  name: string;
  avatar_url: string | null;
  job_title: string | null;
}

export interface ChatAttachment {
  id: number;
  name: string;
  file_size_formatted?: string;
}

export interface ChatMessage {
  id: number;
  message: string;
  parent_id: number | null;
  is_edited: boolean;
  created_at: string;
  sender: ChatSender;
  attachment: ChatAttachment | null;
}

export interface SendMessagePayload {
  message: string;
  parent_id?: number | null;
  file_attachment_id?: number | null;
}

export interface CurrentUser {
  id: number;
  isAdmin: boolean;
}
