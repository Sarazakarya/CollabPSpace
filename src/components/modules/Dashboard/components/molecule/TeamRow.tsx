import { useTranslation } from "react-i18next";
import Avatar from "../../Navbar/atoms/Avatar";
import type { TeamRowProps } from "../types/DashboardType";


export default function TeamRow({ name, membersCount, projectsCount }: TeamRowProps) {
  const { t } = useTranslation();

  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <li className="flex items-center gap-3">
      <Avatar initials={initials} size={26} />

      <div className="min-w-0 flex-1">
        <p className="ds-text-xs ds-text-primary truncate font-medium">
          {name}
        </p>

        <p className="ds-text-xs ds-text-secondary">
          {membersCount} {t("dashboard.teams.members")}
        </p>
      </div>

      <span className="ds-text-xs ds-text-secondary shrink-0">
        {projectsCount} {t("dashboard.teams.projects")}
      </span>
    </li>
  );
}
