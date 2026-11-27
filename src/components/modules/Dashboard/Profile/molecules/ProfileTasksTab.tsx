import { useTranslation } from "react-i18next";
import { Skeleton } from "@/components/ui/skeleton";
import type { ProfileTasksTabProps } from "../types/profile.types";
import { ProfileTaskProgressRow } from "../molecules/ProfileTaskProgressRow";
import { FALLBACK_TASKS } from "../utils/profileFormatters";

export const ProfileTasksTab = ({
  tasks,
  isLoading = false,
}: ProfileTasksTabProps) => {
  const { t } = useTranslation();

  const resolvedTasks = tasks && tasks.length > 0 ? tasks : FALLBACK_TASKS;

  const todoTasks = resolvedTasks.filter((task) => task.status !== "Completed");

  const doneTasks = resolvedTasks.filter((task) => task.status === "Completed");

  return (
    <div className="grid grid-cols-1 gap-6 pt-2 lg:grid-cols-2">
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="flex items-center justify-between bg-gray-100 px-6 py-3.5">
          <h3 className="text-sm font-semibold text-gray-800">
            {t("profile.tasks.todo")}
          </h3>

          <span className="text-xs font-medium text-gray-500">
            {todoTasks.length}
          </span>
        </div>

        <div className="p-6">
          <div className="mb-3 flex items-center justify-between text-xs text-gray-400">
            <span>{t("profile.tasks.name")}</span>
            <span>{t("profile.tasks.tasks")}</span>
          </div>

          {isLoading ? (
            <div className="space-y-4">
              {Array.from({ length: 4 }, (_, index) => (
                <div key={index} className="space-y-2">
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-1.5 w-full rounded-full" />
                </div>
              ))}
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {todoTasks.map((task) => (
                <ProfileTaskProgressRow
                  key={task.id}
                  task={task}
                  variant="todo"
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="flex items-center justify-between bg-emerald-50 px-6 py-3.5">
          <h3 className="text-sm font-semibold text-emerald-700">
            {t("profile.tasks.done")}
          </h3>

          <span className="text-xs font-medium text-emerald-600">
            {doneTasks.length}
          </span>
        </div>

        <div className="p-6">
          <div className="mb-3 flex items-center justify-between text-xs text-gray-400">
            <span>{t("profile.tasks.name")}</span>
            <span>{t("profile.tasks.tasks")}</span>
          </div>

          {isLoading ? (
            <div className="space-y-4">
              {Array.from({ length: 4 }, (_, index) => (
                <div key={index} className="space-y-2">
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-1.5 w-full rounded-full" />
                </div>
              ))}
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {doneTasks.map((task) => (
                <ProfileTaskProgressRow
                  key={task.id}
                  task={task}
                  variant="done"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
