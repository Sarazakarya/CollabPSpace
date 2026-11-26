import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import type { TeamMember } from "../types/TeamType";

interface Props {
  member: TeamMember;
}

const TeamMemberCard = ({ member }: Props) => {
  const initials = member.name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="space-y-2 py-3">
      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <Avatar className="size-7">
            <AvatarImage src={member.avatar_url ?? undefined} />
            <AvatarFallback className="text-[10px]">{initials}</AvatarFallback>
          </Avatar>

          <div className="min-w-0">
            <p className="truncate text-xs font-medium">{member.name}</p>
            <p className="truncate text-[10px] text-muted-foreground">
              {member.role_in_team}
            </p>
          </div>
        </div>

        <span className="shrink-0 text-[10px] text-muted-foreground">
          {member.tasks_ratio}
        </span>
      </div>

      <Progress value={member.progress_percentage} className="h-1.5" />
    </div>
  );
};

export default TeamMemberCard;
