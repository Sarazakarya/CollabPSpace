import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { Briefcase, Calendar, CheckSquare, Clock, Pencil } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

import type { ProfileTab, UserProfile } from "../types/profile.types";
import { ProfileMetricCard } from "../molecules/ProfileMetricCard";
import { formatJoinedDate, tabs } from "../utils/profileFormatters";

interface ProfileHeaderBannerProps {
  user?: UserProfile;
  isLoading?: boolean;
  activeTab: ProfileTab;
  onTabChange: (tab: ProfileTab) => void;
  onAvatarChange?: (file: File) => void;
  isUploadingAvatar?: boolean;
}

const DEFAULT_AVATAR =
  "https://ui-avatars.com/api/?name=Mohamed+Salah&background=0052FF&color=fff";

export const ProfileHeaderBanner: React.FC<ProfileHeaderBannerProps> = ({
  user,
  isLoading = false,
  activeTab,
  onTabChange,
  onAvatarChange,
  isUploadingAvatar = false,
}) => {
  const { t } = useTranslation();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file && onAvatarChange) {
      onAvatarChange(file);
    }

    e.target.value = "";
  };

  const avatarUrl = user?.avatar_url || DEFAULT_AVATAR;

  return (
    <header className="space-y-6">
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
        <div className="flex items-center gap-4">
          <div className="relative h-16 w-16 shrink-0">
            {isLoading ? (
              <Skeleton className="h-16 w-16 rounded-full" />
            ) : (
              <>
                <img
                  key={avatarUrl}
                  src={avatarUrl}
                  alt={user?.name || "User Avatar"}
                  onError={(e) => {
                    e.currentTarget.src = DEFAULT_AVATAR;
                  }}
                  className="h-16 w-16 rounded-full border border-gray-200 object-cover"
                />

                {activeTab === "settings" && (
                  <>
                    <button
                      type="button"
                      disabled={isUploadingAvatar}
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute bottom-0 right-0 flex h-6 w-6 items-center justify-center rounded-full bg-[#0052FF] text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {isUploadingAvatar ? (
                        <span className="h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      ) : (
                        <Pencil className="h-3 w-3" />
                      )}
                    </button>

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/png,image/jpeg,image/webp"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                  </>
                )}
              </>
            )}
          </div>

          <div className="min-w-0">
            {isLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-6 w-40 rounded-md" />
                <Skeleton className="h-4 w-56 rounded-md" />
              </div>
            ) : (
              <>
                <h1 className="text-xl font-bold text-gray-900">
                  {user?.name || "Mohamed Salah"}
                </h1>

                {activeTab !== "settings" && (
                  <div className="mt-1 flex flex-wrap items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1.5">
                      <Briefcase className="h-3.5 w-3.5 text-gray-400" />
                      {user?.job_title || "UI/UX Designer"}
                    </span>

                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-gray-400" />
                      {t("profile.header.joined", {
                        date: formatJoinedDate(user?.joined_at),
                      })}
                    </span>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {activeTab !== "settings" && (
          <div className="flex flex-wrap gap-4">
            <ProfileMetricCard
              title={t("profile.header.completedTasks")}
              value={user?.completed_tasks_count ?? 140}
              isLoading={isLoading}
              iconBgClass="bg-blue-50 text-[#0052FF]"
              icon={<CheckSquare className="h-5 w-5" />}
            />

            <ProfileMetricCard
              title={t("profile.header.hoursWorked")}
              value={user?.hours_worked ?? 345}
              isLoading={isLoading}
              iconBgClass="bg-pink-50 text-pink-500"
              icon={<Clock className="h-5 w-5" />}
            />
          </div>
        )}
      </div>

      <nav className="flex items-center gap-6 overflow-x-auto border-b border-gray-200">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;

          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => onTabChange(tab.key)}
              className={`shrink-0 border-b-2 pb-3 text-sm font-medium transition ${
                isActive
                  ? "border-[#0052FF] text-[#0052FF]"
                  : "border-transparent text-gray-500 hover:text-gray-800"
              }`}
            >
              {t(tab.label)}
            </button>
          );
        })}
      </nav>
    </header>
  );
};
