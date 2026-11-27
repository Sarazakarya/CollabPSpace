type GaugeProps = {
  value: number;
};

const Gauge = ({ value }: GaugeProps) => {
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

export default Gauge;
