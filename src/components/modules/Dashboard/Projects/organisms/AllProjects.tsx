import ProjectsTable from "../molecule/ProjectsTable";
import ProjectsToolbar from "../molecule/ProjectsToolBar";
import { useProjects } from "../hooks/useProjects";
import useGetBySearch from "../hooks/useGetBySearch";
import type { Project, ProjectApi } from "../types/Projecttypes";

const PER_PAGE = 15;

function mapProject(project: ProjectApi): Project {
  const priorityMap = {
    High: "high",
    Medium: "medium",
    Low: "low",
    Critical: "critical",
  } as const;

  return {
    id: project.id,
    name: project.name,
    description: project.description ?? "",
    type: "",
    status: project.status,
    priority:
      priorityMap[project.priority as keyof typeof priorityMap] ?? "medium",
    start_date: project.start_date,
    deadline: project.deadline,
    files_count: project.files_count,
    completion_percentage: project.progress_percentage,
    due_progress: 0,
    total_tasks: 0,
    pending_tasks: 0,
    in_progress_tasks: 0,
    completed_tasks: 0,
    teams: project.teams ?? [],
    overview: [],
  };
}

export default function AllProjects() {
  const {
    setPage,
    search,
    setSearch,
    status,
    setStatus,
    sort,
    setSort,
    filters,
  } = useGetBySearch();

  const { data, isLoading, isError } = useProjects({
    ...filters,
    per_page: PER_PAGE,
  });

  const projects: Project[] = (data?.data?.data ?? []).map(mapProject);
  const meta = data?.data?.meta;

  return (
    <div className="flex flex-col gap-4">
      <ProjectsToolbar
        search={search}
        status={status}
        sort={sort}
        onSearchChange={(value) => {
          setSearch(value);
          setPage(1);
        }}
        onStatusChange={(value) => {
          setStatus(value);
          setPage(1);
        }}
        onSortChange={(value) => {
          setSort(value);
          setPage(1);
        }}
      />

      <ProjectsTable
        projects={projects}
        meta={meta}
        isLoading={isLoading}
        isError={isError}
        onPageChange={setPage}
      />
    </div>
  );
}
