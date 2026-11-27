import { Skeleton } from "@/components/ui/skeleton";
import { formatDeltaText } from "../utils/reportFormatters";
import type { StatKpiCardProps } from "../types/report.types";

export const StatKpiCard = ({
  title,
  percentage = 0,
  delta = 0,
  subtitle = "From last month",
  isLoading = false,
}: StatKpiCardProps) => {
  const { text: deltaText, isPositive } = formatDeltaText(delta);

  return (
    <div className="flex flex-col justify-between rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <h3 className="text-base font-medium text-gray-800">{title}</h3>

      {isLoading ? (
        <div className="my-4 space-y-3">
          <Skeleton className="h-10 w-28 rounded-lg" />
          <Skeleton className="h-3.5 w-36 rounded-md" />
        </div>
      ) : (
        <>
          <div className="my-4 text-4xl font-semibold tracking-tight text-gray-900">
            {percentage}
          </div>

          <p className="text-xs text-gray-500">
            <span
              className={`font-semibold ${
                isPositive ? "text-emerald-500" : "text-rose-500"
              }`}
            >
              {deltaText}
            </span>{" "}
            {subtitle}
          </p>
        </>
      )}
    </div>
  );
};
