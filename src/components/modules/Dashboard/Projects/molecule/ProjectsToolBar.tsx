import { Search } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import type { ProjectToolBarProps, SortOrder, StatusFilter } from "../types/Projecttypes";
import FilterSelect from "./FilterSelect";
import { statusOptions } from "../utils/Projectsdata";




export default function ProjectsToolbar(p: ProjectToolBarProps) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="relative w-full sm:w-64">
        <Search className="absolute inset-s-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={p.search}
          onChange={(e) => p.onSearchChange(e.target.value)}
          placeholder={t("projects.search")}
          className="h-9 ps-8"
        />
      </div>

      <div className="flex gap-2">
        <FilterSelect<StatusFilter>
          value={p.status}
          onChange={p.onStatusChange}
          className="w-36"
          options={statusOptions}
        />

        <FilterSelect<SortOrder>
          value={p.sort}
          onChange={p.onSortChange}
          className="w-28"
          options={[
            { value: "newest", label: t("projects.filters.newest") },
            { value: "oldest", label: t("projects.filters.oldest") },
          ]}
        />
      </div>
    </div>
  );
}
