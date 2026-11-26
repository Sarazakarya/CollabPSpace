import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { Skeleton } from "@/components/ui/skeleton";
import type { ProjectsProgressAreaChartProps } from "../types/report.types";

export const ProjectsProgressAreaChart: React.FC<
  ProjectsProgressAreaChartProps
> = ({
  title,
  data,
  selectedProject,
  onProjectChange,
  projects = [],
  isLoading = false,
}) => {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-base font-medium text-gray-800">{title}</h3>
        {isLoading ? (
          <Skeleton className="h-4 w-24 rounded-md" />
        ) : (
          <select
            value={selectedProject}
            onChange={(e) => onProjectChange(e.target.value)}
            className="bg-transparent text-xs font-medium text-gray-600 focus:outline-none cursor-pointer"
          >
            <option value="all">All Projects</option>
            {projects.map((proj) => (
              <option key={proj.id} value={String(proj.id)}>
                {proj.name}
              </option>
            ))}
          </select>
        )}
      </div>

      <div className="h-60 w-full">
        {isLoading ? (
          <div className="flex h-full flex-col justify-between py-2">
            <Skeleton className="h-44 w-full rounded-xl" />
            <div className="flex justify-between pt-2">
              {Array.from({ length: 7 }).map((_, idx) => (
                <Skeleton key={idx} className="h-3 w-8" />
              ))}
            </div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="progressGreen" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#86EFAC" stopOpacity={0.75} />
                  <stop offset="95%" stopColor="#86EFAC" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="label"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9CA3AF", fontSize: 11 }}
              />
              <YAxis
                domain={[10, 100]}
                ticks={[10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9CA3AF", fontSize: 11 }}
              />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#4ADE80"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#progressGreen)"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};
