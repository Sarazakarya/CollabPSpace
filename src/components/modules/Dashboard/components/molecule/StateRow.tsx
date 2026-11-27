import { useTranslation } from "react-i18next";
import { ClipboardList, Loader, CheckCircle2 } from "@/assets/icons/Icons";
import StatCard from "./StateCard";
import RateCard from "./RateCard";
import type { StatsRowProps } from "../types/DashboardType";

export default function StatsRow({ data }: StatsRowProps) {
  const { t } = useTranslation();

  const stats = [
    {
      key: "pending",
      value: data.tasks.pending,
      total: data.tasks.total,
      tone: "warning" as const,
      icon: ClipboardList,
      trend: data.tasks.pending_percentage,
    },
    {
      key: "inProgress",
      value: data.tasks.in_progress,
      total: data.tasks.total,
      tone: "info" as const,
      trend: data.tasks.in_progress_percentage,
      icon: Loader,
    },
    {
      key: "completed",
      value: data.tasks.completed,
      total: data.tasks.total,
      tone: "success" as const,
      icon: CheckCircle2,
      trend: data.tasks.completed_percentage,
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((item) => (
        <StatCard
          key={item.key}
          title={t(`dashboard.stats.${item.key}`)}
          value={item.value}
          total={item.total}
          tone={item.tone}
          icon={item.icon}
          trend={item.trend}
        />
      ))}

      <RateCard
        value={data.tasks.completion_rate}
        trend={data.tasks.completed_percentage}
      />
      {data.tasks.total === 0 && (
        <p className="col-span-full ds-text-xs ds-text-secondary py-4 text-center">
          {t("dashboard.stats.empty")}
        </p>
      )}
    </div>
  );
}
