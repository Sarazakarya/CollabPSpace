import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { Skeleton } from "@/components/ui/skeleton";
import type { WorkerActivityLineChartProps } from "../types/report.types";

export const WorkerActivityLineChart = ({
  title,
  data,
  period,
  onPeriodChange,
  isLoading = false,
}: WorkerActivityLineChartProps) => {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-base font-medium text-gray-800">{title}</h3>

        {isLoading ? (
          <Skeleton className="h-4 w-20 rounded-md" />
        ) : (
          <select
            value={period}
            onChange={(e) => onPeriodChange(e.target.value)}
            className="cursor-pointer bg-transparent text-xs font-medium text-gray-600 focus:outline-none"
          >
            <option value="monthly">Monthly</option>
            <option value="weekly">Weekly</option>
            <option value="yearly">Yearly</option>
          </select>
        )}
      </div>

      <div className="h-60 w-full">
        {isLoading ? (
          <div className="flex h-full flex-col justify-between py-2">
            <Skeleton className="h-44 w-full rounded-xl" />
            <div className="flex justify-between pt-2">
              {Array.from({ length: 6 }).map((_, idx) => (
                <Skeleton key={idx} className="h-3 w-8" />
              ))}
            </div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
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
              <Line
                type="linear"
                dataKey="value"
                stroke="#0052FF"
                strokeWidth={3}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};
