export const meetingKeys = {
  all: ["meetings"] as const,
  list: ["meetings", "list"] as const,
  detail: (id: number) => ["meetings", "detail", id] as const,
  summary: (id: number) => ["meetings", "summary", id] as const,
  projects: ["meetings", "projects"] as const,
  members: (projectId: number) => ["meetings", "members", projectId] as const,
};
