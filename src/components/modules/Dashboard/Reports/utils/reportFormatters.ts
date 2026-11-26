import type { ChartDataPoint } from "../types/report.types";

export const formatPercentage = (value?: number): string => {
  if (typeof value !== "number" || Number.isNaN(value)) return "0 %";
  return `${Math.round(value)} %`;
};

export const formatDeltaText = (
  delta?: number
): { text: string; isPositive: boolean } => {
  const safeDelta = delta ?? 0;
  const isPositive = safeDelta >= 0;
  const sign = isPositive ? "+" : "";
  return {
    text: `${sign}${safeDelta}%`,
    isPositive,
  };
};

export const normalizeSeriesData = (
  items:
    | {
        label?: string;
        month?: string;
        value?: number;
        rate?: number;
        progress?: number;
        score?: number;
      }[]
    | undefined,
  fallback: ChartDataPoint[]
): ChartDataPoint[] => {
  if (!items || items.length === 0) return fallback;
  return items.map((item) => ({
    label: item.label ?? item.month ?? "",
    value: item.value ?? item.rate ?? item.progress ?? item.score ?? 0,
  }));
};
