import { Layers } from "@/assets/icons/Icons";
import { useTranslation } from "react-i18next";
import { toneMap } from "../../utils/DashboardData";
import ProgressBar from "./Prgressar";
import type { ProjectItemProps } from "../types/DashboardType";

export default function ProjectItem({
  name,
  done,
  total,
  tone,
}: ProjectItemProps) {
  const { t } = useTranslation();

  return (
    <li className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <span
          className="flex size-7 items-center justify-center rounded-md"
          style={{ backgroundColor: toneMap[tone].bg }}
        >
          <Layers className="size-4" />
        </span>
        <span className="ds-text-sm ds-text-primary font-semibold">{name}</span>
      </div>
      <ProgressBar value={(done / total) * 100} variant={tone} />
      <span className="ds-text-xs ds-text-secondary">
        {t("dashboard.activeProjects.tasks", { done, total })}
      </span>
    </li>
  );
}
