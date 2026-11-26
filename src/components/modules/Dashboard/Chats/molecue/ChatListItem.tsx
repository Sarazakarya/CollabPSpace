import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { ChatProject } from "../types/ChatTypes";
import useGetUnreadCount from "../hooks/useGetUnreadCount";
import { getInitials } from "../data/chatUtils";


interface Props {
  project: ChatProject;
  active: boolean;
}

const ChatListItem = ({ project, active }: Props) => {
  const { t } = useTranslation();
  const { data: unread = 0 } = useGetUnreadCount(project.id);

  return (
    <Link
      to={`/chats/${project.id}`}
      className={`hover:bg-accent flex items-center gap-3 rounded-xl px-3 py-3 transition-colors ${
        active ? "bg-accent" : ""
      }`}
    >
      <Avatar className="size-11">
        <AvatarFallback className="ds-bg-brand-soft ds-text-brand font-semibold">
          {getInitials(project.name)}
        </AvatarFallback>
      </Avatar>

      <div className="min-w-0 flex-1">
        <p className="ds-text-base ds-text-primary truncate font-medium">{project.name}</p>
        <p className="ds-text-xs ds-text-secondary truncate">{t("chats.projectChat")}</p>
      </div>

      {unread > 0 && (
        <span className="ds-bg-brand ds-text-white min-w-5 rounded-full px-1.5 text-center text-xs font-semibold">
          {unread}
        </span>
      )}
    </Link>
  );
};

export default ChatListItem;
