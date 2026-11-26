import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Search, FolderKanban, Users, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useProjects } from "@/components/modules/Dashboard/Projects/hooks/useProjects";
import { useGetTeamList } from "../../Projects/hooks/useGetTeamList";
import { useDebounceSearch } from "../../Projects/hooks/useDebounceSearch";

const NavBarSearch = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounceSearch(search);

  const [isOpen, setIsOpen] = useState(false);

  const { data: projectsData, isLoading: projectsLoading } = useProjects({
    search: debouncedSearch,
    page: 1,
    per_page: 5,
  });

  const { data: teamsData, isLoading: teamsLoading } = useGetTeamList();

  const projects = useMemo(() => {
    const response = projectsData?.data?.data;

    if (!Array.isArray(response)) return [];

    return response;
  }, [projectsData]);

  const teams = useMemo(() => {
    const response = teamsData?.data?.data;

    if (!Array.isArray(response)) return [];

    return response.filter((team: { name: string }) =>
      team.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [teamsData, search]);

  const hasSearch = search.trim().length > 0;

  const handleClear = () => {
    setSearch("");
    setIsOpen(false);
  };

  return (
    <div className="relative hidden w-64 sm:block">
      <div className="ds-bg relative flex items-center rounded-full">
        <Search className="ds-text-secondary absolute inset-s-3 size-4" />

        <Input
          type="search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => {
            if (search.trim()) setIsOpen(true);
          }}
          placeholder={t("dashboard.search")}
          className="ds-text-xs ds-text-primary h-9 border-0 bg-transparent ps-9 pe-9 shadow-none focus-visible:ring-0"
        />

        {search && (
          <button
            type="button"
            onClick={handleClear}
            className="ds-text-secondary absolute inset-e-3"
          >
            <X size={15} />
          </button>
        )}
      </div>

      {isOpen && hasSearch && (
        <>
          <button
            type="button"
            aria-label="Close search results"
            className="fixed inset-0 z-40 cursor-default"
            onClick={() => setIsOpen(false)}
          />

          <div className="ds-bg ds-border absolute inset-s-0 top-12 z-50 max-h-96 w-80 overflow-y-auto rounded-xl border p-3 shadow-lg">
            {(projectsLoading || teamsLoading) && (
              <p className="ds-text-secondary p-3 text-center text-xs">
                Searching...
              </p>
            )}

            {!projectsLoading && projects.length > 0 && (
              <div className="mb-3">
                <p className="ds-text-secondary mb-2 text-xs font-semibold">
                  Projects
                </p>

                {projects.map((project: { id: number; name: string }) => (
                  <button
                    key={project.id}
                    type="button"
                    onClick={() => {
                      navigate(`/projects/${project.id}`);
                      handleClear();
                    }}
                    className="ds-text-primary hover:ds-bg flex w-full items-center gap-3 rounded-lg p-2 text-start text-sm"
                  >
                    <FolderKanban size={16} className="ds-text-secondary" />
                    <span className="truncate">{project.name}</span>
                  </button>
                ))}
              </div>
            )}

            {!teamsLoading && teams.length > 0 && (
              <div>
                <p className="ds-text-secondary mb-2 text-xs font-semibold">
                  Teams
                </p>

                {teams.map((team: { id: number; name: string }) => (
                  <button
                    key={team.id}
                    type="button"
                    onClick={() => {
                      navigate("/teams");
                      handleClear();
                    }}
                    className="ds-text-primary hover:ds-bg flex w-full items-center gap-3 rounded-lg p-2 text-start text-sm"
                  >
                    <Users size={16} className="ds-text-secondary" />
                    <span className="truncate">{team.name}</span>
                  </button>
                ))}
              </div>
            )}

            {!projectsLoading &&
              !teamsLoading &&
              projects.length === 0 &&
              teams.length === 0 && (
                <p className="ds-text-secondary p-3 text-center text-xs">
                  No results found
                </p>
              )}
          </div>
        </>
      )}
    </div>
  );
};

export default NavBarSearch;
