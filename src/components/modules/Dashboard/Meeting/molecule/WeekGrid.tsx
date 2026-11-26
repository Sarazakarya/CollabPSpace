import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import type { Meeting } from "../types/MeetingTypes";
import {
  END_HOUR,
  START_HOUR,
  addDays,
  clampHour,
  formatHour,
  getHour,
  getLocale,
  toYMD,
} from "../utils/meetingUtils";
import MeetingCard from "./MeetingCard";

interface Props {
  weekStart: Date;
  meetings: Meeting[];
}

const HOURS = Array.from({ length: END_HOUR - START_HOUR + 1 }, (_, i) => START_HOUR + i);

const WeekGrid = ({ weekStart, meetings }: Props) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  const todayKey = toYMD(new Date());

  // meetings of one day that start in one hour row
  const getCellMeetings = (dayKey: string, hour: number) =>
    meetings.filter(
      (m) => m.meeting_date === dayKey && clampHour(getHour(m.start_time)) === hour,
    );

  return (
    <div className="ds-card overflow-x-auto !p-0">
      <div className="grid min-w-[56rem] grid-cols-[4.5rem_repeat(7,minmax(0,1fr))]">
        {/* header row */}
        <div className="ds-text-xs ds-text-secondary border-b border-border p-3 text-center">
          {t("meetings.time")}
        </div>

        {days.map((day) => {
          const key = toYMD(day);
          const isToday = key === todayKey;

          return (
            <div
              key={key}
              className={`border-s border-b border-border p-3 text-center ${isToday ? "bg-accent" : ""}`}
            >
              <p className="ds-text-xs ds-text-secondary">
                {isToday
                  ? t("meetings.today")
                  : day.toLocaleDateString(getLocale(lang), { weekday: "short" })}
              </p>
              <p className="ds-text-base ds-text-primary font-semibold">{day.getDate()}</p>
            </div>
          );
        })}

        {/* one row per hour */}
        {HOURS.map((hour) => (
          <Fragment key={hour}>
            <div className="ds-text-xs ds-text-secondary border-b border-border p-2 text-center">
              {formatHour(hour, lang)}
            </div>

            {days.map((day) => {
              const key = toYMD(day);

              return (
                <div
                  key={key}
                  className={`min-h-24 space-y-2 border-s border-b border-border p-2 ${
                    key === todayKey ? "bg-accent" : ""
                  }`}
                >
                  {getCellMeetings(key, hour).map((meeting) => (
                    <MeetingCard key={meeting.id} meeting={meeting} />
                  ))}
                </div>
              );
            })}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default WeekGrid;
