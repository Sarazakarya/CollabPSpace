import { Search } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";

import type { SortOrder, StatusFilter } from "../types/Projecttypes";
import FilterSelect from "./FilterSelect";

interface Props {
  search: string;
  status: StatusFilter;
  sort: SortOrder;
  onSearchChange: (v: string) => void;
  onStatusChange: (v: StatusFilter) => void;
  onSortChange: (v: SortOrder) => void;
}

const statusOptions: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "All Statuses" },
  { value: "In Progress", label: "In Progress" },
  { value: "Pending", label: "Pending" },
  { value: "On Hold", label: "On Hold" },
  { value: "Completed", label: "Completed" },
];

export default function ProjectsToolbar(p: Props) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="relative w-full sm:w-64">
        <Search className="absolute start-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
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
