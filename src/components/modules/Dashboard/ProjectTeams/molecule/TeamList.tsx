import type { ProjectTeam } from "../types/TeamType";
import TeamCard from "./TeamCard";

interface Props {
  teams: ProjectTeam[];
}

const TeamsList = ({ teams }: Props) => {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {teams.map((team) => (
        <TeamCard key={team.id} team={team} />
      ))}
    </div>
  );
};

export default TeamsList;
