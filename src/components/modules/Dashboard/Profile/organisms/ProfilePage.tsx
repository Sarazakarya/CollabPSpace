import React, { useState } from "react";
import type { ProfileTab } from "../types/profile.types";

import { useGetProfileData } from "../hooks/useGetProfileData";
import { useUpdateProfileSettings } from "../hooks/useUpdateProfileSettings";

import { ProfileOverviewTab } from "../molecules/ProfileOverviewTab";
import { ProfileSettingsTab } from "../molecules/ProfileSettingsTab";
import { ProfileHeaderBanner } from "../molecules/ProfileHeaderBanner";
import { ProfileTasksTab } from "../molecules/ProfileTasksTab";
import { ProfileFilesTab } from "../molecules/ProfileFilesTab";

const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ProfileTab>("overview");

  const { meQuery, tasksQuery, filesQuery } = useGetProfileData();

  const user = meQuery.data?.data?.user;
  const tasks = tasksQuery.data?.data;
  const files = filesQuery.data?.data;

  const { uploadAvatar, isUploadingAvatar } = useUpdateProfileSettings(
    user,
    () => meQuery.refetch(),
  );

  return (
    <main className="min-h-screen bg-[#F5F7FA] p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <ProfileHeaderBanner
          user={user}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onAvatarChange={uploadAvatar}
          isUploadingAvatar={isUploadingAvatar}
          isLoading={meQuery.isLoading}
        />

        {activeTab === "overview" && (
          <ProfileOverviewTab user={user} isLoading={meQuery.isLoading} />
        )}

        {activeTab === "tasks" && (
          <ProfileTasksTab tasks={tasks} isLoading={tasksQuery.isLoading} />
        )}

        {activeTab === "files" && (
          <ProfileFilesTab files={files} isLoading={filesQuery.isLoading} />
        )}

        {activeTab === "settings" && (
          <ProfileSettingsTab user={user} onRefetch={() => meQuery.refetch()} />
        )}
      </div>
    </main>
  );
};

export default ProfilePage;
