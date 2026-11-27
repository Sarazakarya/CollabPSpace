import { useTranslation } from "react-i18next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MeetingSummary from "./MeetingSummary";
import type { MeetingsProps } from "../types/MeetingTypes";

const MeetingTabs = ({ meeting }: MeetingsProps) => {
  const { t } = useTranslation();
  const notes = meeting.notes ?? meeting.description;

  return (
    <Tabs defaultValue="summary" className="space-y-4">
      <TabsList>
        <TabsTrigger value="summary">
          {t("meetings.tabs.aiSummary")}
        </TabsTrigger>
        <TabsTrigger value="notes">{t("meetings.tabs.notes")}</TabsTrigger>
      </TabsList>

      <div className="ds-card">
        <TabsContent value="summary" className="m-0">
          <MeetingSummary meetingId={meeting.id} />
        </TabsContent>

        <TabsContent value="notes" className="m-0">
          {notes ? (
            <p className="ds-text-base ds-text-secondary leading-relaxed whitespace-pre-wrap">
              {notes}
            </p>
          ) : (
            <p className="ds-text-sm ds-text-disabled">
              {t("meetings.summary.noNotes")}
            </p>
          )}
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default MeetingTabs;
