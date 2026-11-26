import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ErrorState from "@/core/ui-states/ErrorState";

import ProjectTeamsSkeleton from "../molecule/ProjectTeamsSkeleton";
import EmptyState from "@/core/ui-states/EmptyState";
import useGetProjectTeams from "../hooks/useGetProjectsTeam";
import TeamsList from "../molecule/TeamList";
import Seo from "@/core/seo/Seo";

const ProjectTeams = () => {
  const { id } = useParams();
  const { t } = useTranslation();

  const { data, isLoading, isError } = useGetProjectTeams(id ?? "");

  const teams = data?.data;

  if (isLoading) {
    return <ProjectTeamsSkeleton />;
  }

  if (isError || !teams) {
    return <ErrorState />;
  }

  if (teams.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-4">
      <Seo
        title="Projects Team | Collabspace"
        description="Manage your projects, tasks, meetings and teams in one place."
        keywords={["Dashboard", "Projects", "Tasks", "Teams", "Meeting"]}
        noIndex
      />
      <h2 className="text-lg font-semibold">{t("projects.teams.title")}</h2>

      <TeamsList teams={teams} />
    </div>
  );
};

export default ProjectTeams;
