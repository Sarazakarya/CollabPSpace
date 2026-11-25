import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useTranslation } from "react-i18next";
import DashboardCard from "./DashboardCard";

const tick = { fontSize: 11, fill: "var(--color-text-secondary)" };

export default function ProjectOverviewChart({
  data,
  className = "",
}: {
  data: {
    label: string;
    month: string;
    month_number: number;
    year: number;
    is_future: boolean;
    projects: number;
    created_tasks: number;
    completed_tasks: number;
  }[];
  className?: string;
}) {
  const { t } = useTranslation();

  const chartData = data.map((p) => ({
    ...p,
    label: t(`dashboard.months.${p.month}`),
  }));

  return (
    <DashboardCard
      title={t("dashboard.overview.title")}
      className={className}
      action={
        <div className="ds-text-xs ds-text-secondary flex gap-3">
          <span>{t("dashboard.overview.allProjects")}</span>
          <span>{t("dashboard.overview.thisYear")}</span>
        </div>
      }
    >
      <div className="h-56 w-full" dir="ltr">
        <ResponsiveContainer>
          <AreaChart
            data={chartData}
            margin={{ top: 8, right: 8, left: -16, bottom: 0 }}
          >
            <defs>
              <linearGradient id="overviewFill" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  style={{
                    stopColor: "var(--color-brand)",
                    stopOpacity: 0.25,
                  }}
                />
                <stop
                  offset="100%"
                  style={{
                    stopColor: "var(--color-brand)",
                    stopOpacity: 0,
                  }}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              vertical={false}
              strokeDasharray="3 3"
              stroke="var(--color-border)"
            />

            <XAxis
              dataKey="label"
              tick={tick}
              axisLine={false}
              tickLine={false}
            />

            <YAxis tick={tick} axisLine={false} tickLine={false} />

            <Tooltip />

            <Area
              type="monotone"
              dataKey="projects"
              stroke="var(--color-brand)"
              strokeWidth={2}
              fill="url(#overviewFill)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </DashboardCard>
  );
}
