import { Card } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import type { ProjectTeam } from "../types/TeamType";
import TeamMemberCard from "./TeamMemberCard";

interface Props {
  team: ProjectTeam;
}

const TeamCard = ({ team }: Props) => {
  const { t } = useTranslation();

  return (
    <Card className="gap-3 p-3">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-semibold">{team.name}</h3>

        <p className="text-xs text-muted-foreground">
          {team.completion_percentage}% {t("projects.teams.completed")}
        </p>
      </div>

      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>{t("projects.teams.name")}</span>
        <span>{t("projects.teams.tasks")}</span>
      </div>

      <div className="divide-y">
        {team.members.map((member) => (
          <TeamMemberCard key={member.id} member={member} />
        ))}
      </div>
    </Card>
  );
};

export default TeamCard;
