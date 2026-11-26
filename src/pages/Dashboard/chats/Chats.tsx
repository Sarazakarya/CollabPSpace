import Seo from "@/core/seo/Seo";
import ChatEmptyState from "../../../components/modules/Dashboard/Chats/molecue/ChatEmptyState";
const Chats = () => (
  <>
    {" "}
    <Seo
      title=" Chats | Collabspace"
      description="Manage your projects, tasks, meetings and teams in one place."
      keywords={["Dashboard", "Projects", "Tasks", "Teams", "Meeting"]}
      noIndex
    />
    <ChatEmptyState />;
  </>
);

export default Chats;
