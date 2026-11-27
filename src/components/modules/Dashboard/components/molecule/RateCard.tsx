import { ArrowUpRight } from "@/assets/icons/Icons";
import { useTranslation } from "react-i18next";
import Gauge from "../../ProjectOverView/molecule/Gauge";

export default function RateCard({
  value,
  trend,
}: {
  value: number;
  trend: number;
}) {
  const { t } = useTranslation();

  return (
    <article className="ds-card flex flex-col gap-3">
      <h3 className="ds-text-base ds-text-primary font-semibold">
        {t("dashboard.stats.completionRate")}
      </h3>

      <Gauge value={value} />

      <p className="ds-text-xs ds-text-secondary flex items-center gap-1">
        <ArrowUpRight className="ds-text-success size-3" />
        {t("dashboard.stats.fromLastMonth", { value: trend })}
      </p>
    </article>
  );
}
