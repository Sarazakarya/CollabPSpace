import { Link, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ChevronRight } from "lucide-react";

import type { HeaderProps } from "../types/overviewtype";
import { formatDate } from "../data/FormData";
import { tabs } from "../data/projectOverViewdata";

const ProjectOverViewHeader = ({ project }: HeaderProps) => {
  const { t, i18n } = useTranslation();

  const { start_date, deadline, total_days, days_remaining, is_overdue } =
    project.due_date_indicator;

  let elapsed = 0;

  if (is_overdue) {
    elapsed = 100;
  } else if (total_days > 0) {
    elapsed = ((total_days - days_remaining) / total_days) * 100;

    if (elapsed > 100) elapsed = 100;
    if (elapsed < 0) elapsed = 0;
  }

  return (
    <div className="space-y-4">
      <nav className="ds-text-xs ds-text-secondary flex items-center gap-1">
        <Link to="/projects" className="hover:text-foreground">
          {t("nav.projects")}
        </Link>

        <ChevronRight className="size-3 rtl:rotate-180" />

        <span className="ds-text-primary font-medium">{project.name}</span>
      </nav>

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="ds-title-lg ds-text-primary">{project.name}</h1>

            <span className="ds-badge ds-badge-success">
              {t("projects.completedPct", {
                value: project.progress_percentage,
              })}
            </span>
          </div>
        </div>

        <div className="ds-card w-full max-w-xs space-y-2 p-4! sm:w-72">
          <div className="flex items-center justify-between">
            <p className="ds-text-sm ds-text-primary font-semibold">
              {t("projects.dueDate")}
            </p>

            <p
              className={`ds-text-xs font-medium ${
                is_overdue ? "ds-text-danger" : "ds-text-secondary"
              }`}
            >
              {is_overdue
                ? t("projects.overview.overdue")
                : t("projects.overview.daysLeft", {
                    value: days_remaining,
                  })}
            </p>
          </div>

          <div className="ds-bg-muted h-1.5 overflow-hidden rounded-full">
            <div
              className={`h-full rounded-full ${
                is_overdue ? "bg-(--color-danger)" : "ds-bg-brand"
              }`}
              style={{ width: `${elapsed}%` }}
            />
          </div>

          <div className="ds-text-xs ds-text-secondary flex justify-between gap-2">
            <span>
              {t("projects.startDate")}: {formatDate(start_date, i18n.language)}
            </span>

            <span>
              {t("projects.deadline")}: {formatDate(deadline, i18n.language)}
            </span>
          </div>
        </div>
      </div>

      <div className="flex gap-6 border-b border-border">
        {tabs.map((tab) => (
          <NavLink
            key={tab.key}
            to={tab.to}
            end={"end" in tab ? tab.end : false}
            className={({ isActive }) => {
              if (isActive) {
                return "ds-text-base ds-text-brand -mb-px border-b-2 border-(--color-brand) pb-3 font-medium transition-colors";
              }

              return "ds-text-base ds-text-secondary -mb-px border-b-2 border-transparent pb-3 font-medium transition-colors hover:text-foreground";
            }}
          >
            {t(`projects.tabs.${tab.key}`)}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default ProjectOverViewHeader;
