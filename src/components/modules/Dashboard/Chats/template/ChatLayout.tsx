import { Outlet, useParams } from "react-router-dom";
import ChatSidebar from "../molecue/ChatSidebar";

const ChatLayout = () => {
  const { projectId } = useParams();

  return (
    <div className="flex h-[calc(100vh-8rem)] min-h-128 gap-4">
      <ChatSidebar
        activeId={projectId}
        className={projectId ? "hidden md:flex" : "flex"}
      />

      <section
        className={`ds-card min-w-0 flex-1 flex-col overflow-hidden p-0! ${
          projectId ? "flex" : "hidden md:flex"
        }`}
      >
        <Outlet />
      </section>
    </div>
  );
};

export default ChatLayout;
