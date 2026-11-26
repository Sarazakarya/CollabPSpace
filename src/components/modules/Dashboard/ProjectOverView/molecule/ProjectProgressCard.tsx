import { useTranslation } from "react-i18next";
import type { ProgressProps } from "../types/overviewtype";




const Gauge = ({ value }: { value: number }) => {
  const p = Math.min(100, Math.max(0, value));
  const angle = -90 + (p / 100) * 180;
  const arc = "M 20 100 A 80 80 0 0 1 180 100";

  return (
    <svg
      viewBox="0 0 200 110"
      className="mx-auto w-56"
      role="img"
      aria-label={`${p}%`}
    >
      <path
        d={arc}
        pathLength={100}
        fill="none"
        stroke="var(--color-bg-muted)"
        strokeWidth={14}
        strokeLinecap="round"
      />
      {p > 0 && (
        <path
          d={arc}
          pathLength={100}
          fill="none"
          stroke="var(--color-brand)"
          strokeWidth={14}
          strokeLinecap="round"
          strokeDasharray={`${p} 100`}
        />
      )}
      <g transform={`rotate(${angle} 100 100)`}>
        <line
          x1="100"
          y1="100"
          x2="100"
          y2="38"
          stroke="var(--color-text-primary)"
          strokeWidth={3}
          strokeLinecap="round"
        />
        <circle
          cx="100"
          cy="100"
          r="6"
          fill="var(--color-bg-card)"
          stroke="var(--color-text-primary)"
          strokeWidth={3}
        />
      </g>
    </svg>
  );
};

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
