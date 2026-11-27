import { useTranslation } from "react-i18next";
import { FileText } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import type { ProfileOverviewTabProps } from "../types/profile.types";
import { FALLBACK_ACTIVITIES } from "../utils/profileFormatters";

export const ProfileOverviewTab = ({
  user,
  isLoading = false,
}: ProfileOverviewTabProps) => {
  const { t } = useTranslation();

  const activities =
    user?.recent_activities && user.recent_activities.length > 0
      ? user.recent_activities
      : FALLBACK_ACTIVITIES;

  return (
    <div className="space-y-8 pt-2">
      <section className="max-w-3xl space-y-3">
        <h2 className="text-base font-semibold text-gray-900">
          {t("profile.overview.about")}
        </h2>

        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        ) : (
          <p className="text-sm leading-relaxed text-gray-600">
            {user?.bio ||
              "Experienced UI/UX Designer with over 5 years of creating user-centered digital experiences. Passionate about design systems, usability, and working with creative teams to deliver exceptional products. Strong background in user research, wireframing, prototyping, and front-end development."}
          </p>
        )}
      </section>

      <section className="max-w-3xl space-y-4">
        <h2 className="text-base font-semibold text-gray-900">
          {t("profile.overview.recentActivities")}
        </h2>

        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 4 }, (_, index) => (
              <div key={index} className="flex items-center justify-between">
                <Skeleton className="h-4 w-72" />
                <Skeleton className="h-3 w-12" />
              </div>
            ))}
          </div>
        ) : (
          <ul className="space-y-3.5">
            {activities.map((activity) => (
              <li
                key={activity.id}
                className="flex items-center justify-between text-sm"
              >
                <div className="flex items-center gap-3 text-gray-700">
                  <span className="flex h-6 w-6 items-center justify-center rounded-md bg-amber-50 text-amber-500">
                    <FileText className="h-3.5 w-3.5" />
                  </span>

                  <span>{activity.description}</span>
                </div>

                <span className="text-xs text-gray-400">
                  {activity.time_ago}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};
