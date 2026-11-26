import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import type { Project } from "../types/Projecttypes";
import DueDateCard from "./DueDateCard";
import ProjectTabs from "./ProjectTabs";


export default function ProjectItemHeader({ project }: { project: Project }) {
  const { t } = useTranslation();

  return (
    <header className="flex flex-col gap-4">
      <div className="grid gap-4 md:grid-cols-[1fr_320px] md:items-end">
        <div className="flex flex-col gap-2">
          <nav className="ds-text-xs ds-text-secondary flex items-center gap-1">
            <Link to="/projects" className="hover:underline">
              {t("projects.title")}
            </Link>
            <ChevronRight className="size-3 rtl:rotate-180" />
            <span>{project.name}</span>
          </nav>
          <div className="flex items-center gap-3">
            <h1 className="ds-title-lg ds-text-primary">{project.name}</h1>
            <span className="ds-badge ds-badge-success">
              {t("projects.completedPct", {
                value: project.completion_percentage,
              })}
            </span>
          </div>
        </div>
        <DueDateCard
          progress={project.due_progress}
          startDate={project.start_date}
          deadline={project.deadline}
        />
      </div>
      <ProjectTabs projectId={project.id} />
    </header>
  );
}
