import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface ProfileMetricCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  iconBgClass: string;
  isLoading?: boolean;
}

export const ProfileMetricCard: React.FC<ProfileMetricCardProps> = ({
  title,
  value,
  icon,
  iconBgClass,
  isLoading = false,
}) => {
  return (
    <div className="flex min-w-[200px] items-center justify-between rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div>
        <p className="text-xs font-medium text-gray-500">{title}</p>
        {isLoading ? (
          <Skeleton className="mt-2 h-8 w-16 rounded-md" />
        ) : (
          <p className="mt-2 text-2xl font-bold text-gray-900">{value}</p>
        )}
      </div>
      <div
        className={`flex h-11 w-11 items-center justify-center rounded-full ${iconBgClass}`}
      >
        {icon}
      </div>
    </div>
  );
};
