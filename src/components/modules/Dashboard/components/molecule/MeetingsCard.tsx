import { useTranslation } from "react-i18next";
import DashboardCard from "./DashboardCard";
import MeetingItem from "./MettingItem";
import type { MattingsProps } from "../types/DashboardType";
import EmptyMessage from "./EmptyMessage";

export default function MeetingsCard({ data }: MattingsProps) {
  const { t, i18n } = useTranslation();

  return (
    <DashboardCard title={t("dashboard.meetings.title")} viewAll>
      {data.length === 0 ? (
        <EmptyMessage
          title={t("dashboard.meetings.emptyTitle")}
          message={t("dashboard.meetings.empty")}
        />
      ) : (
        <ul className="flex max-h-62.5 flex-col gap-5 overflow-y-auto overflow-x-hidden pr-2">
          {data.map((meeting) => {
            const people = meeting.participants.slice(0, 3);
            const extra = Math.max(meeting.participants.length - 3, 0);

            const date = new Date(
              `${meeting.date}T00:00:00`,
            ).toLocaleDateString(i18n.language, {
              day: "numeric",
              month: "short",
            });

            return (
              <MeetingItem
                key={meeting.id}
                title={meeting.title}
                date={date}
                time={meeting.start_time.slice(0, 5)}
                people={people}
                extra={extra}
              />
            );
          })}
        </ul>
      )}
    </DashboardCard>
  );
}
