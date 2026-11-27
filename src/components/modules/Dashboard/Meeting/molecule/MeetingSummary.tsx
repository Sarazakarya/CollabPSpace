import { Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import useCreateSummaryTasks from "../hooks/useCreateSummaryTasks";
import useGenerateSummary from "../hooks/useGenerateSummary";
import useGetMeetingSummary from "../hooks/useGetMeetingSummary";
import type { MeetingSummaryProps } from "../types/MeetingTypes";


const MeetingSummary = ({ meetingId }: MeetingSummaryProps) => {
  const { t } = useTranslation();
  const { data: summary, isLoading } = useGetMeetingSummary(meetingId);
  const generateMutation = useGenerateSummary(meetingId);
  const tasksMutation = useCreateSummaryTasks(meetingId);

  if (isLoading) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
    );
  }

  // no summary yet
  if (!summary) {
    return (
      <div className="flex flex-col items-center gap-3 py-8 text-center">
        <p className="ds-text-sm ds-text-secondary">{t("meetings.summary.empty")}</p>
        <Button
          className="rounded-xl"
          onClick={() => generateMutation.mutate()}
          disabled={generateMutation.isPending}
        >
          <Sparkles className="size-4" />
          {generateMutation.isPending
            ? t("meetings.summary.generating")
            : t("meetings.summary.generate")}
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <h3 className="ds-title-md ds-text-primary">{t("meetings.summary.title")}</h3>

      {summary.summary && (
        <p className="ds-text-base ds-text-secondary leading-relaxed">{summary.summary}</p>
      )}

      {summary.key_points.length > 0 && (
        <div className="space-y-2">
          <h4 className="ds-text-base ds-text-primary font-semibold">
            {t("meetings.summary.keyPoints")}
          </h4>
          <ul className="ds-text-sm ds-text-secondary list-disc space-y-1.5 ps-5">
            {summary.key_points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
      )}

      {summary.action_items.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <h4 className="ds-text-base ds-text-primary font-semibold">
              {t("meetings.summary.actionItems")}
            </h4>
            <Button
              size="sm"
              variant="outline"
              className="rounded-lg"
              onClick={() => tasksMutation.mutate()}
              disabled={tasksMutation.isPending}
            >
              {tasksMutation.isPending
                ? t("meetings.summary.creatingTasks")
                : t("meetings.summary.createTasks")}
            </Button>
          </div>
          <ul className="ds-text-sm ds-text-secondary list-disc space-y-1.5 ps-5">
            {summary.action_items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MeetingSummary;
