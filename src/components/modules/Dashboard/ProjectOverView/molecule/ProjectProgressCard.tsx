import { useTranslation } from "react-i18next";
import type { ProgressProps } from "../types/overviewtype";
import Gauge from "./Gauge";





const ProjectProgressCard = ({ progress, stats }: ProgressProps) => {
  const { t } = useTranslation();

  const items = [
    {
      label: t("projects.progress.pending"),
      value: stats.pending,
      dot: "bg-[var(--color-warning)]",
    },
    {
      label: t("projects.progress.inProgress"),
      value: stats.in_progress,
      dot: "bg-[var(--color-brand)]",
    },
    {
      label: t("projects.progress.done"),
      value: stats.completed,
      dot: "bg-[var(--color-success)]",
    },
  ];

  return (
    <div className="ds-card space-y-4">
      <h3 className="ds-title-md ds-text-primary">
        {t("projects.progress.title")}
      </h3>

      <div className="text-center">
        <Gauge value={progress} />
        <p className="ds-title-lg ds-text-primary -mt-2">{progress}%</p>
        <p className="ds-text-xs ds-text-secondary">
          {t("projects.progress.completed")}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-2 text-center">
        {items.map((item) => (
          <div key={item.label}>
            <p className="ds-text-sm ds-text-primary font-semibold" dir="ltr">
              {item.value}
              <span className="ds-text-secondary font-normal">
                /{stats.total}
              </span>
            </p>
            <p className="ds-text-xs ds-text-secondary flex items-center justify-center gap-1">
              <span className={`size-1.5 shrink-0 rounded-full ${item.dot}`} />
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectProgressCard;
