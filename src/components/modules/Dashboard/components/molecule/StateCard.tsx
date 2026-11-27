import type { LucideIcon } from "lucide-react";
import { ArrowUpRight } from "@/assets/icons/Icons";
import { useTranslation } from "react-i18next";
import { toneMap, type Tone } from "../../utils/DashboardData";
import ProgressBar from "./Prgressar";

interface Props {
  title: string;
  value: number;
  total: number;
  trend: number;
  tone: Tone;
  icon: LucideIcon;
}

export default function StatCard({
  title,
  value,
  total,
  trend,
  tone,
  icon: Icon,
}: Props) {
  const { t } = useTranslation();

  return (
    <article className="ds-card flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h3 className="ds-text-base ds-text-primary font-semibold">{title}</h3>
        <span
          className={`flex size-8 items-center justify-center rounded-lg ${toneMap[tone].bg} ${toneMap[tone].color}`}
        >
          <Icon className="size-4" />
        </span>
      </div>
      <p className="ds-title-xl ds-text-primary">{value}</p>
      <p className="ds-text-xs ds-text-secondary flex items-center gap-1">
        <ArrowUpRight className="ds-text-success size-3" />
        {t("dashboard.stats.fromLastMonth", { value: trend })}
      </p>
      <div className="flex flex-col gap-1">
        <ProgressBar value={(value / total) * 100} variant={tone} />
        <span className="ds-text-xs ds-text-secondary text-end">
          {value}/{total}
        </span>
      </div>
    </article>
  );
}
