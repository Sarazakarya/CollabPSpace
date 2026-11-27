import { useMemo } from "react";
import type { WeekGridProps } from "../types/MeetingTypes";
import {
  END_HOUR,
  START_HOUR,
  addDays,
  clampHour,
  getHour,
  toYMD,
} from "../utils/meetingUtils";

const useWeekGrid = ({ weekStart, meetings }: WeekGridProps) => {
  const hours = useMemo(() => {
    return Array.from(
      { length: END_HOUR - START_HOUR + 1 },
      (_, i) => START_HOUR + i,
    );
  }, []);

  const days = useMemo(() => {
    const todayKey = toYMD(new Date());

    return Array.from({ length: 7 }, (_, i) => {
      const date = addDays(weekStart, i);
      const key = toYMD(date);

      return {
        date,
        key,
        isToday: key === todayKey,
      };
    });
  }, [weekStart]);

  const getCellMeetings = useMemo(() => {
    return (dayKey: string, hour: number) => {
      return meetings.filter((meeting) => {
        const meetingHour = clampHour(getHour(meeting.start_time));

        return meeting.meeting_date === dayKey && meetingHour === hour;
      });
    };
  }, [meetings]);

  return {
    hours,
    days,
    getCellMeetings,
  };
};

export default useWeekGrid;
