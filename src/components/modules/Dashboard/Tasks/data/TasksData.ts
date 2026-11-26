export const priorityStyles: Record<string, string> = {
  Low: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300",
  Medium:
    "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300",
  High: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300",
};

export type TaskColumnKey =
  | "Pending"
  | "In Progress"
  | "In Review"
  | "Completed";

interface ColumnData {
  key: TaskColumnKey;
  title: string;
  color: string;
}

export const columnsdata: ColumnData[] = [
  { key: "Pending", title: "Pending", color: "bg-yellow-50" },
  { key: "In Progress", title: "In Progress", color: "bg-blue-50" },
  { key: "In Review", title: "In Review", color: "bg-purple-50" },
  { key: "Completed", title: "Completed", color: "bg-green-50" },
];
