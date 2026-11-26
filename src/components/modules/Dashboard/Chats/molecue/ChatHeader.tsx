import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getInitials } from "../data/chatUtils";


interface Props {
  name: string;
}

const ChatHeader = ({ name }: Props) => {
  const { t } = useTranslation();

  return (
    <header className="flex items-center gap-3 border-b border-border px-4 py-3">
      <Link
        to="/chats"
        aria-label={t("chats.back")}
        className="ds-text-secondary hover:text-foreground md:hidden"
      >
        <ArrowLeft className="size-5 rtl:rotate-180" />
      </Link>

      <Avatar className="size-10">
        <AvatarFallback className="ds-bg-brand-soft ds-text-brand font-semibold">
          {getInitials(name)}
        </AvatarFallback>
      </Avatar>

      <div className="min-w-0">
        <p className="ds-text-base ds-text-primary truncate font-semibold">{name}</p>
        <p className="ds-text-xs ds-text-secondary">{t("chats.projectChat")}</p>
      </div>
    </header>
  );
};

export default ChatHeader;
