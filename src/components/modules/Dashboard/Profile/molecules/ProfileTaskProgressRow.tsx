import React from "react";
import { CheckCircle2 } from "lucide-react";
import type {  ProfileTaskProgressRowProps } from "../types/profile.types";
import { getTaskProgressPercentage } from "../utils/profileFormatters";

export const ProfileTaskProgressRow: React.FC<ProfileTaskProgressRowProps> = ({
  task,
  variant,
}) => {
  const isDone = variant === "done";
  const percentage = isDone
    ? 100
    : getTaskProgressPercentage(task.status, task.progress);

  return (
    <div className="space-y-2 py-2.5">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">{task.name}</span>
        {isDone && <CheckCircle2 className="h-4 w-4 text-emerald-500" />}
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
        <div
          className={`h-full rounded-full transition-all duration-300 ${
            isDone ? "bg-emerald-500" : "bg-[#0052FF]"
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
