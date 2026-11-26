import { useTranslation } from "react-i18next";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { ProjectChart } from "../types/overviewtype";
import { getMonthLabel } from "../data/FormData";

interface Props {
  chart: ProjectChart;
}

const ProjectChartCard = ({ chart }: Props) => {
  const { t, i18n } = useTranslation();

  const createdLabel = t("projects.overview.created");
  const completedLabel = t("projects.status.Completed");

  const data = chart.data
    .filter((item) => !item.is_future)
    .map((item) => ({
      month: getMonthLabel(item.month_number, i18n.language),
      created: item.created_tasks,
      completed: item.completed_tasks,
    }));

  return (
    <div className="ds-card space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="ds-title-md ds-text-primary">
          {t("dashboard.overview.title")}
        </h3>
        <div className="ds-text-xs ds-text-secondary flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-(--color-brand)" />
            {createdLabel}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-(--color-success)" />
            {completedLabel}
          </span>
          <span className="ds-bg-muted rounded-md px-2 py-1">
            {t("dashboard.overview.thisYear")} ({chart.year})
          </span>
        </div>
      </div>

      <div className="h-64 w-full" dir="ltr">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 8, right: 8, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="gCreated" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="var(--color-brand)"
                  stopOpacity={0.25}
                />
                <stop
                  offset="100%"
                  stopColor="var(--color-brand)"
                  stopOpacity={0}
                />
              </linearGradient>
              <linearGradient id="gCompleted" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="var(--color-success)"
                  stopOpacity={0.2}
                />
                <stop
                  offset="100%"
                  stopColor="var(--color-success)"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid
              vertical={false}
              stroke="var(--color-border)"
              strokeDasharray="3 3"
            />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "var(--color-text-secondary)" }}
            />
            <YAxis
              allowDecimals={false}
              domain={[0, (max: number) => Math.max(4, max)]}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "var(--color-text-secondary)" }}
            />
            <Tooltip
              contentStyle={{
                background: "var(--color-bg-card)",
                border: "1px solid var(--color-border)",
                borderRadius: 12,
                fontSize: 12,
              }}
            />
            <Area
              type="monotone"
              dataKey="created"
              name={createdLabel}
              stroke="var(--color-brand)"
              strokeWidth={2}
              fill="url(#gCreated)"
            />
            <Area
              type="monotone"
              dataKey="completed"
              name={completedLabel}
              stroke="var(--color-success)"
              strokeWidth={2}
              fill="url(#gCompleted)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProjectChartCard;
