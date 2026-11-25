import { useTranslation } from "react-i18next";
import TeamRow from "./TeamRow";
import DashboardCard from "./DashboardCard";

type Team = {
  id: number;
  name: string;
  description: string;
  members_count: number;
  projects_count: number;
};

type Props = {
  data: Team[];
};

export default function TeamsCard({ data }: Props) {
  const { t } = useTranslation();

  return (
    <DashboardCard title={t("dashboard.teams.title")} viewAll>
      <div className="ds-text-xs ds-text-secondary flex justify-between">
        <span>{t("dashboard.teams.name")}</span>
        <span>{t("dashboard.teams.projects")}</span>
      </div>

      <ul className="flex max-h-62.5 flex-col gap-3 overflow-y-auto overflow-x-hidden pr-2">
        {data.map((team) => (
          <TeamRow
            key={team.id}
            name={team.name}
            membersCount={team.members_count}
            projectsCount={team.projects_count}
          />
        ))}
      </ul>
    </DashboardCard>
  );
}
