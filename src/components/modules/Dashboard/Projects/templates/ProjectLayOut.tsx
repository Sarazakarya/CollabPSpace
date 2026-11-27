import { Outlet } from "react-router-dom";
import ProjectsHeader from "../molecule/ProjectsHeader";
import AddProjectModal from "../molecule/AddProjectModal";
import { useGetTeamList } from "../hooks/useGetTeamList";
import useCreateProject from "../hooks/useCreateProject";

export default function ProjectLayout() {
  const { data, isLoading } = useGetTeamList();



  const {
    open,
    setOpen,
    form,
    selectedTeams,
    handleTeamChange,
    onSubmit,
    isPending,
  } = useCreateProject();

  const teams =
    data?.data?.data?.map((team) => ({
      id: team.id,
      name: team.name,
      members: team.members_count,
    })) ?? [];

  return (
    <section className="flex flex-col gap-6">
      <ProjectsHeader onAdd={() => setOpen(true)} />

      <AddProjectModal
        open={open}
        setOpen={setOpen}
        teams={teams}
        isLoading={isLoading}
        form={form}
        selectedTeams={selectedTeams}
        handleTeamChange={handleTeamChange}
        onSubmit={onSubmit}
        isPending={isPending}
      />

      <Outlet />
    </section>
  );
}
