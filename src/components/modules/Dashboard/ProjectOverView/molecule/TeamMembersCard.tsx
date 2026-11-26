import { useTranslation } from "react-i18next";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type {  TeamMembersProps } from "../types/overviewtype";
import { getInitials } from "../data/FormData";

const TeamMembersCard = ({ members }: TeamMembersProps) => {
  const { t } = useTranslation();

  return (
    <div className="ds-card space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="ds-title-md ds-text-primary">
          {t("projects.teamMembers.title")}
        </h3>
        <span className="ds-text-xs ds-text-secondary">
          {t("projects.modal.members", { count: members.length })}
        </span>
      </div>

      {members.length === 0 ? (
        <p className="ds-text-sm ds-text-disabled">
          {t("projects.overview.noMembers")}
        </p>
      ) : (
        <ul className="space-y-3">
          {members.map((m) => (
            <li key={m.id} className="flex items-center gap-3">
              <Avatar className="size-9">
                <AvatarImage src={m.avatar_url} alt={m.name} />
                <AvatarFallback>{getInitials(m.name)}</AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <p className="ds-text-sm ds-text-primary truncate font-medium">
                  {m.name}
                </p>
                <p className="ds-text-xs ds-text-secondary truncate">
                  {m.job_title}
                </p>
              </div>
              <span className="ds-badge ds-badge-info">
                {t(`projects.overview.roles.${m.role}`, {
                  defaultValue: m.role,
                })}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TeamMembersCard;
