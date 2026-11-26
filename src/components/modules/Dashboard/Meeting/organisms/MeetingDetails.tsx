import { useParams } from "react-router-dom";
import ErrorState from "@/core/ui-states/ErrorState";
import useGetMeeting from "../hooks/useGetMeeting";
import MeetingHeader from "../molecule/MeetingHeader";
import MeetingTabs from "../molecule/MeetingTabs";
import MeetingVideo from "../molecule/MeetingVideo";
import TranscriptPanel from "../molecule/TranscriptPanel";
import MeetingDetailsSkeleton from "../molecule/MeetingDetailsSkeleton";

const MeetingDetails = () => {
  const { id } = useParams();
  const { data: meeting, isLoading, isError } = useGetMeeting(Number(id));

  if (isLoading) {
    return <MeetingDetailsSkeleton />;
  }

  if (isError || !meeting) return <ErrorState />;

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div className="space-y-6 lg:col-span-2">
        <MeetingHeader meeting={meeting} />
        <MeetingVideo meeting={meeting} />
        <MeetingTabs meeting={meeting} />
      </div>

      <TranscriptPanel transcript={meeting.transcript} />
    </div>
  );
};

export default MeetingDetails;
