import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import type { MeetingsProps } from "../types/MeetingTypes";
import { MEETINGS_PATH, formatTime } from "../utils/meetingUtils";
import AttendeesStack from "./AttendeesStack";

const MeetingCard = ({ meeting }: MeetingsProps) => {
  const { t, i18n } = useTranslation();

  return (
    <div className="bg-card space-y-2 rounded-lg border border-border p-2 shadow-sm">
      <Link to={`${MEETINGS_PATH}/${meeting.id}`} className="block">
        <p className="ds-text-sm ds-text-primary truncate font-semibold">
          {meeting.title}
        </p>
        <p className="ds-text-xs ds-text-secondary">
          {formatTime(meeting.start_time, i18n.language)} -{" "}
          {formatTime(meeting.end_time, i18n.language)}
        </p>
      </Link>

      <div className="flex items-center justify-between gap-1">
        <AttendeesStack attendees={meeting.attendees} max={2} />

        {meeting.meeting_link && (
          <a
            href={meeting.meeting_link}
            target="_blank"
            rel="noreferrer"
            className="ds-text-brand text-xs font-medium hover:underline"
          >
            {t("meetings.join")} +
          </a>
        )}
      </div>
    </div>
  );
};

export default MeetingCard;
