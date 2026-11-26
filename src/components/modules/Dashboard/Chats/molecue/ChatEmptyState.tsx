import { MessageSquare } from "lucide-react";
import { useTranslation } from "react-i18next";

const ChatEmptyState = () => {
  const { t } = useTranslation();

  return (
    <div className="ds-text-secondary flex flex-1 flex-col items-center justify-center gap-3">
      <div className="ds-bg-brand-soft ds-text-brand flex size-14 items-center justify-center rounded-2xl">
        <MessageSquare className="size-6" />
      </div>
      <p className="ds-title-md ds-text-primary">{t("chats.selectChat")}</p>
    </div>
  );
};

export default ChatEmptyState;
