import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import {
  CalendarDays,
  CalendarCheck,
  Flag,
  ListChecks,
  Activity,
  Clock,
} from "lucide-react";
import type { ProjectOverViewProps } from "../types/overviewtype";
import { formatDate } from "../data/FormData";

const DetailItem = ({
  icon,
  iconClass,
  label,
  value,
}: {
  icon: ReactNode;
  iconClass: string;
  label: string;
  value: ReactNode;
}) => (
  <div className="flex items-center gap-3">
    <div
      className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${iconClass}`}
    >
      {icon}
    </div>
    <div>
      <p className="ds-text-xs ds-text-secondary">{label}</p>
      <p className="ds-text-base ds-text-primary font-semibold">{value}</p>
    </div>
  </div>
);

const ProjectDetailsCard = ({ project }: ProjectOverViewProps) => {
  const { t, i18n } = useTranslation();
  const { start_date, deadline, days_remaining, is_overdue } =
    project.due_date_indicator;

  return (
    <div className="ds-card space-y-5">
      <h3 className="ds-title-md ds-text-primary">
        {t("projects.details.title")}
      </h3>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <DetailItem
          icon={<Activity className="size-5" />}
          iconClass="ds-bg-blue-soft ds-text-brand"
          label={t("projects.filters.status")}
          value={t(`projects.status.${project.status}`)}
        />
        <DetailItem
          icon={<CalendarDays className="size-5" />}
          iconClass="ds-bg-purple-soft ds-text-purple"
          label={t("projects.details.startDate")}
          value={formatDate(start_date, i18n.language)}
        />
        <DetailItem
          icon={<CalendarCheck className="size-5" />}
          iconClass="ds-bg-warning-soft ds-text-warning"
          label={t("projects.details.deadline")}
          value={formatDate(deadline, i18n.language)}
        />
        <DetailItem
          icon={<Flag className="size-5" />}
          iconClass="ds-bg-danger-soft ds-text-danger"
          label={t("projects.details.priority")}
          value={t(`projects.priority.${project.priority}`)}
        />
        <DetailItem
          icon={<ListChecks className="size-5" />}
          iconClass="ds-bg-muted ds-text-primary"
          label={t("projects.details.totalTasks")}
          value={project.tasks_statistics.total}
        />
        <DetailItem
          icon={<Clock className="size-5" />}
          iconClass="ds-bg-success-soft ds-text-success"
          label={t("projects.overview.daysRemaining")}
          value={is_overdue ? t("projects.overview.overdue") : days_remaining}
        />
      </div>
    </div>
  );
};

export default ProjectDetailsCard;
