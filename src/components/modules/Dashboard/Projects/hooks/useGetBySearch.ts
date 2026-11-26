import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import type { SortOrder, StatusFilter } from "../types/Projecttypes";
import { useDebounceSearch } from "./useDebounceSearch";

const useGetBySearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");

  const [status, setStatus] = useState<StatusFilter>(
    (searchParams.get("status") as StatusFilter) || "all",
  );

  const [sort, setSort] = useState<SortOrder>(
    (searchParams.get("sort") as SortOrder) || "newest",
  );

  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);

  const debouncedSearch = useDebounceSearch(search);

  const filters = {
    search: debouncedSearch,
    status: status === "all" ? undefined : status,
    sort,
    page,
    per_page: 15,
  };

  useEffect(() => {
    const params = new URLSearchParams();

    if (debouncedSearch) {
      params.set("search", debouncedSearch);
    }

    if (status !== "all") {
      params.set("status", status);
    }

    params.set("sort", sort);
    params.set("page", String(page));

    setSearchParams(params);
  }, [debouncedSearch, status, sort, page, setSearchParams]);

  return {
    search,
    setSearch,
    status,
    setStatus,
    sort,
    setSort,
    page,
    setPage,
    filters,
  };
};

export default useGetBySearch;
