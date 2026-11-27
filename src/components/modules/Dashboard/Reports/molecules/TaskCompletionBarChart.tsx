import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { Skeleton } from "@/components/ui/skeleton";
import type { TaskCompletionBarChartProps } from "../types/report.types";

export const TaskCompletionBarChart = ({
  title,
  data,
  isLoading = false,
}: TaskCompletionBarChartProps) => {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <h3 className="mb-6 text-base font-medium text-gray-800">{title}</h3>

      <div className="h-60 w-full">
        {isLoading ? (
          <div className="flex h-full items-end justify-between gap-3 px-4 pt-6 pb-2">
            {[75, 50, 35, 65, 60, 80].map((height, idx) => (
              <div
                key={idx}
                className="flex flex-1 flex-col items-center gap-2"
              >
                <Skeleton
                  className="w-4 rounded-t-md"
                  style={{ height: `${height}%` }}
                />
                <Skeleton className="h-3 w-7" />
              </div>
            ))}
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} barSize={18}>
              <XAxis
                dataKey="label"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9CA3AF", fontSize: 12 }}
              />
              <YAxis
                domain={[0, 100]}
                ticks={[0, 25, 50, 75, 100]}
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9CA3AF", fontSize: 12 }}
              />
              <Tooltip cursor={{ fill: "#F3F4F6" }} />
              <Bar dataKey="value" fill="#0052FF" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};
