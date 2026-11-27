import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import type { WeekGridProps } from "../types/MeetingTypes";
import { formatHour, getLocale } from "../utils/meetingUtils";
import useWeekGrid from "../hooks/useWeekGrid";
import MeetingCard from "./MeetingCard";

const WeekGrid = ({ weekStart, meetings }: WeekGridProps) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const { hours, days, getCellMeetings } = useWeekGrid({
    weekStart,
    meetings,
  });

  return (
    <div className="ds-card overflow-x-auto p-0!">
      <div className="grid min-w-4xl grid-cols-[4.5rem_repeat(7,minmax(0,1fr))]">
        <div className="ds-text-xs ds-text-secondary border-b border-border p-3 text-center">
          {t("meetings.time")}
        </div>

        {days.map((day) => (
          <div
            key={day.key}
            className={`border-s border-b border-border p-3 text-center ${
              day.isToday ? "bg-accent" : ""
            }`}
          >
            <p className="ds-text-xs ds-text-secondary">
              {day.isToday
                ? t("meetings.today")
                : day.date.toLocaleDateString(getLocale(lang), {
                    weekday: "short",
                  })}
            </p>

            <p className="ds-text-base ds-text-primary font-semibold">
              {day.date.getDate()}
            </p>
          </div>
        ))}

        {hours.map((hour) => (
          <Fragment key={hour}>
            <div className="ds-text-xs ds-text-secondary border-b border-border p-2 text-center">
              {formatHour(hour, lang)}
            </div>

            {days.map((day) => (
              <div
                key={day.key}
                className={`min-h-24 space-y-2 border-s border-b border-border p-2 ${
                  day.isToday ? "bg-accent" : ""
                }`}
              >
                {getCellMeetings(day.key, hour).map((meeting) => (
                  <MeetingCard key={meeting.id} meeting={meeting} />
                ))}
              </div>
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default WeekGrid;
