export const chatKeys = {
  projects: ["chat", "projects"] as const,
  messages: (projectId: number) => ["chat", "messages", projectId] as const,
  unread: (projectId: number) => ["chat", "unread", projectId] as const,
  me: ["chat", "me"] as const,
};
