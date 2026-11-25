import { useTranslation } from "react-i18next";
const badge = {
  high: "ds-badge-danger",
  medium: "ds-badge-warning",
  low: "ds-badge-success",
  critical: "ds-badge-danger",
};

type Props = {
  title: string;
  priority: "low" | "medium" | "high" | "critical";
  due: string;
};

export default function TaskItem({ title, priority, due }: Props) {
  const { t } = useTranslation();

  return (
    <li className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-2">
        <span className="ds-text-sm ds-text-primary font-medium">{title}</span>

        <span className={`ds-badge ${badge[priority]}`}>
          {t(`dashboard.priority.${priority}`)}
        </span>
      </div>

      <div className="ds-text-xs ds-text-secondary flex items-center justify-between">
        <span>
          {due
            ? t("dashboard.tasks.due", { date: due })
            : t("dashboard.tasks.dueToday")}
        </span>
      </div>
    </li>
  );
}
