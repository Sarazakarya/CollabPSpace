export const columnsdata = [
  { apiKey: "Pending", label: "projects.kanban.todo", headerBg: "bg-muted/60" },
  {
    apiKey: "In Progress",
    label: "projects.kanban.inProgress",
    headerBg: "bg-blue-500/10",
  },
  {
    apiKey: "In Review",
    label: "projects.kanban.inReview",
    headerBg: "bg-pink-500/10",
  },
  {
    apiKey: "Completed",
    label: "projects.kanban.completed",
    headerBg: "bg-green-500/10",
  },
] as const;