import { Video } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import type { Meeting } from "../types/MeetingTypes";

interface Props {
  meeting: Meeting;
}

const MeetingVideo = ({ meeting }: Props) => {
  const { t } = useTranslation();

  // recording available => player
  if (meeting.recording_url) {
    return (
      <video
        controls
        src={meeting.recording_url}
        className="aspect-video w-full rounded-2xl bg-black object-cover"
      />
    );
  }

  // no recording => big card with the join link
  return (
    <div className="ds-bg-muted flex aspect-video w-full flex-col items-center justify-center gap-3 rounded-2xl">
      <div className="ds-bg-brand-soft ds-text-brand flex size-14 items-center justify-center rounded-full">
        <Video className="size-6" />
      </div>
      <p className="ds-text-sm ds-text-secondary">{t("meetings.video.noRecording")}</p>

      {meeting.meeting_link && (
        <Button asChild className="rounded-xl">
          <a href={meeting.meeting_link} target="_blank" rel="noreferrer">
            {t("meetings.video.joinMeeting")}
          </a>
        </Button>
      )}
    </div>
  );
};

export default MeetingVideo;
