import MeetingsCalendar from "@/components/modules/Dashboard/Meeting/organisms/MeetingsCalendar";
import Seo from "@/core/seo/Seo";

const Mattings = () => (
  <>
    {" "}
    <Seo
      title="Meeting | Collabspace"
      description="Manage your projects, tasks, meetings and teams in one place."
      keywords={["Dashboard", "Projects", "Tasks", "Teams", "Meeting"]}
      noIndex
    />
    <MeetingsCalendar />;
  </>
);

export default Mattings;
