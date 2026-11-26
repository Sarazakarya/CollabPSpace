import { Link } from "react-router-dom";
import { CalendarDays, ChevronRight, Clock, FolderKanban } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { Meeting } from "../types/MeetingTypes";
import { MEETINGS_PATH, formatDateLong, formatTime } from "../utils/meetingUtils";
import AttendeesStack from "./AttendeesStack";

interface Props {
  meeting: Meeting;
}

const MeetingHeader = ({ meeting }: Props) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  return (
    <div className="space-y-3">
      {/* Breadcrumb */}
      <nav className="ds-text-xs ds-text-secondary flex items-center gap-1">
        <Link to={MEETINGS_PATH} className="hover:text-foreground">
          {t("nav.meetings")}
        </Link>
        <ChevronRight className="size-3 rtl:rotate-180" />
        <span className="ds-text-primary font-medium">{meeting.title}</span>
      </nav>

      <h1 className="ds-title-lg ds-text-primary">{meeting.title}</h1>

      <div className="ds-text-sm ds-text-secondary flex flex-wrap items-center gap-x-4 gap-y-2">
        {meeting.project.name && (
          <span className="ds-badge ds-badge-purple">
            <FolderKanban className="size-3.5" />
            {meeting.project.name}
          </span>
        )}

        <AttendeesStack attendees={meeting.attendees} max={6} className="size-7" />

        <span className="flex items-center gap-1.5">
          <CalendarDays className="size-4" />
          {formatDateLong(meeting.meeting_date, lang)}
        </span>

        <span className="flex items-center gap-1.5">
          <Clock className="size-4" />
          {formatTime(meeting.start_time, lang)} - {formatTime(meeting.end_time, lang)}
        </span>
      </div>
    </div>
  );
};

export default MeetingHeader;
