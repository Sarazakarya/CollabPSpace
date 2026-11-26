import { MoreHorizontal, Paperclip, Pencil, Reply, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { ChatMessage } from "../types/ChatTypes";
import { formatTime, getInitials } from "../data/chatUtils";

interface Props {
  message: ChatMessage;
  parent?: ChatMessage;
  isMine: boolean;
  canManage: boolean; // author or admin
  onReply: (message: ChatMessage) => void;
  onEdit: (message: ChatMessage) => void;
  onDelete: (message: ChatMessage) => void;
}

const MessageBubble = ({ message, parent, isMine, canManage, onReply, onEdit, onDelete }: Props) => {
  const { t, i18n } = useTranslation();

  return (
    <div className={`group flex items-end gap-2 ${isMine ? "flex-row-reverse" : ""}`}>
      {!isMine && (
        <Avatar className="size-8">
          <AvatarImage src={message.sender.avatar_url ?? undefined} alt={message.sender.name} />
          <AvatarFallback>{getInitials(message.sender.name)}</AvatarFallback>
        </Avatar>
      )}

      <div className={`flex max-w-[80%] flex-col gap-1 ${isMine ? "items-end" : "items-start"}`}>
        <div
          className={`rounded-2xl px-4 py-2.5 ${
            isMine
              ? "ds-bg-brand ds-text-white rounded-ee-md"
              : "ds-bg-muted ds-text-primary rounded-es-md"
          }`}
        >
          {!isMine && (
            <p className="ds-text-brand mb-0.5 text-xs font-semibold">{message.sender.name}</p>
          )}

          {/* the message this one replies to */}
          {parent && (
            <div className="mb-1.5 border-s-2 border-current/40 ps-2 text-xs opacity-80">
              <p className="font-semibold">{parent.sender.name}</p>
              <p className="line-clamp-2">{parent.message}</p>
            </div>
          )}

          <p className="ds-text-base break-words whitespace-pre-wrap">{message.message}</p>

          {message.attachment && (
            <div className="mt-2 flex items-center gap-2 rounded-lg bg-black/10 px-2.5 py-1.5 text-xs">
              <Paperclip className="size-3.5 shrink-0" />
              <span className="truncate">{message.attachment.name}</span>
              {message.attachment.file_size_formatted && (
                <span className="shrink-0 opacity-70">{message.attachment.file_size_formatted}</span>
              )}
            </div>
          )}
        </div>

        <p className="ds-text-xs ds-text-secondary">
          {formatTime(message.created_at, i18n.language)}
          {message.is_edited && ` • ${t("chats.edited")}`}
        </p>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger >
          <button
            type="button"
            aria-label={t("chats.actions")}
            className="ds-text-secondary hover:bg-accent rounded-md p-1 focus-visible:opacity-100 data-[state=open]:opacity-100 md:opacity-0 md:group-hover:opacity-100"
          >
            <MoreHorizontal className="size-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align={isMine ? "end" : "start"}>
          <DropdownMenuItem onClick={() => onReply(message)}>
            <Reply className="size-4" />
            {t("chats.reply")}
          </DropdownMenuItem>
          {canManage && (
            <>
              <DropdownMenuItem onClick={() => onEdit(message)}>
                <Pencil className="size-4" />
                {t("chats.edit")}
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onClick={() => onDelete(message)}
              >
                <Trash2 className="size-4" />
                {t("chats.delete")}
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default MessageBubble;
