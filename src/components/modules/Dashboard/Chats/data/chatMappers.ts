/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ApiBody, ChatMessage } from "../types/ChatTypes";

// list can be { data: [...] } or { data: { data: [...] } }
export const extractList = (res: ApiBody): any[] =>
  Array.isArray(res?.data)
    ? res.data
    : Array.isArray(res?.data?.data)
      ? res.data.data
      : [];

// Maps whatever the API sends to the shape the UI uses.
// If your API uses other field names, change them here only.
export const toMessage = (raw: any): ChatMessage => {
  const sender = raw.sender ?? raw.user ?? raw.author ?? {};
  const file = raw.file_attachment ?? raw.attachment ?? raw.file ?? null;

  return {
    id: raw.id,
    message: raw.message ?? raw.body ?? "",
    parent_id: raw.parent_id ?? null,
    is_edited: Boolean(raw.is_edited),
    created_at: raw.created_at,
    sender: {
      id: sender.id,
      name: sender.name ?? "",
      avatar_url: sender.avatar_url ?? null,
      job_title: sender.job_title ?? null,
    },
    attachment: file
      ? {
          id: file.id,
          name: file.name ?? file.file_name ?? "",
          file_size_formatted: file.file_size_formatted,
        }
      : null,
  };
};
