import { ChevronLeft, ChevronRight, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { cn } from "@/lib/utils";
import type {
  PaginationMeta,
  Project,
  ProjectStatus,
} from "../types/Projecttypes";

interface Props {
  projects: Project[];
  meta?: PaginationMeta;
  isLoading?: boolean;
  isError?: boolean;
  onPageChange?: (page: number) => void;
}

const columns = [
  "name",
  "startDate",
  "deadline",
  "status",
  "files",
  "team",
  "priority",
];

const priorityStyle = {
  high: "bg-red-500/10 text-red-600 dark:text-red-400",
  medium: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  low: "bg-green-500/10 text-green-600 dark:text-green-400",
  critical: "bg-red-500/10 text-red-600 dark:text-red-400",
} as const;

const statusStyle: Record<ProjectStatus, string> = {
  "In Progress": "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  Pending: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
  "On Hold": "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  Completed: "bg-green-500/10 text-green-600 dark:text-green-400",
};

function getNameLetters(name: string) {
  return name.trim().slice(0, 2).toUpperCase().split("").join(" ");
}

function pageList(current: number, last: number): (number | "gap")[] {
  if (last <= 5) {
    return Array.from({ length: last }, (_, index) => index + 1);
  }

  const pages = new Set([1, last, current - 1, current + 1]);

  const sortedPages = [...pages]
    .filter((page) => page >= 1 && page <= last)
    .sort((a, b) => a - b);

  return sortedPages.flatMap((page, index) => {
    if (index > 0 && page - sortedPages[index - 1] > 1) {
      return ["gap" as const, page];
    }

    return [page];
  });
}

export default function ProjectsTable({
  projects,
  meta,
  isLoading = false,
  isError = false,
  onPageChange,
}: Props) {
  const { t } = useTranslation();

  const message = isError
    ? t("projects.error")
    : !isLoading && projects.length === 0
      ? t("projects.empty")
      : null;

  function handlePageChange(page: number) {
    if (page < 1 || (meta && page > meta.last_page)) {
      return;
    }

    onPageChange?.(page);
  }

  return (
    <div className="flex flex-col gap-4">
      <Card className="overflow-hidden gap-0 py-0">
        <Table className="min-w-[720px]">
          <TableHeader>
            <TableRow className="border border-border bg-muted/60 hover:bg-muted/60">
              {columns.map((column) => (
                <TableHead
                  key={column}
                  className="px-4 py-4 text-start text-sm font-bold text-foreground"
                >
                  {t(`projects.columns.${column}`)}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading &&
              Array.from({ length: 3 }).map((_, index) => (
                <TableRow key={index}>
                  {columns.map((column) => (
                    <TableCell key={column} className="px-4 py-4">
                      <Skeleton className="h-4 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))}

            {message && (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="py-8 text-center text-sm text-muted-foreground"
                >
                  {message}
                </TableCell>
              </TableRow>
            )}

            {!isLoading &&
              !isError &&
              projects.map((project) => (
                <TableRow
                  key={project.id}
                  className="border-b border-border/40 transition-colors hover:bg-muted/30"
                >
                  <TableCell className="px-4 py-4 text-sm font-medium text-foreground">
                    <Link
                      to={`/projects/${project.id}`}
                      className="hover:underline"
                    >
                      {project.name}
                    </Link>
                  </TableCell>

                  <TableCell className="px-4 py-4 text-sm text-muted-foreground">
                    {project.start_date}
                  </TableCell>

                  <TableCell className="px-4 py-4 text-sm text-muted-foreground">
                    {project.deadline}
                  </TableCell>

                  <TableCell className="px-4 py-4">
                    <Badge
                      variant="secondary"
                      className={cn(
                        "border-transparent",
                        statusStyle[project.status],
                      )}
                    >
                      {project.status}
                    </Badge>
                  </TableCell>

                  <TableCell className="px-4 py-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-2">
                      <FileText className="size-3.5" />
                      {t("projects.files", {
                        count: project.files_count,
                      })}
                    </span>
                  </TableCell>

                  <TableCell className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-2 rtl:space-x-reverse">
                        {project.teams.slice(0, 3).map((team) => (
                          <Avatar
                            key={team.id}
                            className="size-9 border-2 border-background"
                            title={team.name}
                          >
                            <AvatarFallback className="bg-primary/10 text-xs font-bold text-primary">
                              {getNameLetters(team.name)}
                            </AvatarFallback>
                          </Avatar>
                        ))}

                        {project.teams.length > 3 && (
                          <Avatar className="size-9 border-2 border-background">
                            <AvatarFallback className="bg-muted text-xs font-medium">
                              +{project.teams.length - 3}
                            </AvatarFallback>
                          </Avatar>
                        )}
                      </div>

                      {project.teams.length === 0 && (
                        <span className="text-sm text-muted-foreground">—</span>
                      )}
                    </div>
                  </TableCell>

                  <TableCell className="px-4 py-4">
                    <Badge
                      variant="secondary"
                      className={cn(
                        "border-transparent",
                        priorityStyle[project.priority],
                      )}
                    >
                      {t(`projects.priority.${project.priority}`)}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Card>

      {meta && meta.last_page > 1 && (
        <Pagination className="justify-between">
          <span className="text-xs text-muted-foreground">
            {t("projects.pagination.page", {
              page: meta.current_page,
              total: meta.last_page,
            })}
          </span>

          <PaginationContent>
            <PaginationItem>
              <PaginationLink
                href="#"
                size="default"
                aria-disabled={meta.current_page <= 1}
                className={cn(
                  "gap-1",
                  meta.current_page <= 1 && "pointer-events-none opacity-50",
                )}
                onClick={(event) => {
                  event.preventDefault();
                  handlePageChange(meta.current_page - 1);
                }}
              >
                <ChevronLeft className="size-4 rtl:rotate-180" />
                {t("projects.pagination.prev")}
              </PaginationLink>
            </PaginationItem>

            {pageList(meta.current_page, meta.last_page).map((page, index) => (
              <PaginationItem key={`${page}-${index}`}>
                {page === "gap" ? (
                  <PaginationEllipsis />
                ) : (
                  <PaginationLink
                    href="#"
                    isActive={page === meta.current_page}
                    onClick={(event) => {
                      event.preventDefault();
                      handlePageChange(page);
                    }}
                  >
                    {page}
                  </PaginationLink>
                )}
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationLink
                href="#"
                size="default"
                aria-disabled={meta.current_page >= meta.last_page}
                className={cn(
                  "gap-1",
                  meta.current_page >= meta.last_page &&
                    "pointer-events-none opacity-50",
                )}
                onClick={(event) => {
                  event.preventDefault();
                  handlePageChange(meta.current_page + 1);
                }}
              >
                {t("projects.pagination.next")}
                <ChevronRight className="size-4 rtl:rotate-180" />
              </PaginationLink>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
