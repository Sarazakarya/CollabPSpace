import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { tabs } from "../utils/Projectsdata";

export default function ProjectTabs({ projectId }: { projectId: number }) {
  const { t } = useTranslation();
  const base = `/projects/${projectId}`;

  return (
    <nav className="flex gap-6 border-b border-border">
      {tabs.map(({ key, path, disabled }) =>
        disabled ? (
          <span key={key} className="ds-text-sm ds-text-disabled -mb-px py-2">
            {t(`projects.tabs.${key}`)}
          </span>
        ) : (
          <NavLink
            key={key}
            to={path ? `${base}/${path}` : base}
            end={!path}
            className={({ isActive }) =>
              `ds-text-sm -mb-px border-b-2 py-2 font-medium ${
                isActive
                  ? "ds-text-brand border-(--color-brand)"
                  : "ds-text-secondary border-transparent"
              }`
            }
          >
            {t(`projects.tabs.${key}`)}
          </NavLink>
        ),
      )}
    </nav>
  );
}
