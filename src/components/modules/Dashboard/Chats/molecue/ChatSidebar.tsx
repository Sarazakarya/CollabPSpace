import { useState } from "react";
import { Search } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import useGetChatProjects from "../hooks/useGetChatProjects";
import ChatListItem from "./ChatListItem";

interface Props {
  activeId?: string;
  className?: string;
}

const ChatSidebar = ({ activeId, className = "" }: Props) => {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const { data: projects = [], isLoading, isError } = useGetChatProjects();

  const filtered = projects.filter((p) =>
    p.name.toLowerCase().includes(search.trim().toLowerCase()),
  );

  return (
    <aside className={`ds-card w-full flex-col gap-4 !p-4 md:w-80 md:shrink-0 ${className}`}>
      <h1 className="ds-title-lg ds-text-primary">{t("nav.chats")}</h1>

      <div className="relative">
        <Search className="ds-text-secondary pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t("chats.search")}
          className="h-10 rounded-xl ps-9"
        />
      </div>

      <p className="ds-text-sm ds-text-secondary font-medium">{t("chats.projectChats")}</p>

      <div className="-mx-2 flex-1 space-y-1 overflow-y-auto px-2">
        {isLoading && (
          <>
            <Skeleton className="h-16 w-full rounded-xl" />
            <Skeleton className="h-16 w-full rounded-xl" />
            <Skeleton className="h-16 w-full rounded-xl" />
          </>
        )}

        {isError && (
          <p className="ds-text-sm ds-text-danger text-center">{t("projects.error")}</p>
        )}

        {!isLoading && !isError && filtered.length === 0 && (
          <p className="ds-text-sm ds-text-disabled text-center">{t("chats.noChats")}</p>
        )}

        {filtered.map((project) => (
          <ChatListItem
            key={project.id}
            project={project}
            active={String(project.id) === activeId}
          />
        ))}
      </div>
    </aside>
  );
};

export default ChatSidebar;
