import { useEffect, useRef } from "react";
import type { ChatMessage } from "../types/ChatTypes";
import MessageBubble from "./MessageBubble";
import EmptyState from "@/core/ui-states/EmptyState";

interface Props {
  messages: ChatMessage[];
  myId?: number;
  isAdmin: boolean;
  onReply: (message: ChatMessage) => void;
  onEdit: (message: ChatMessage) => void;
  onDelete: (message: ChatMessage) => void;
}

const MessageList = ({
  messages,
  myId,
  isAdmin,
  onReply,
  onEdit,
  onDelete,
}: Props) => {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  if (messages.length === 0) {
    return <EmptyState />;
  }

  const byId = new Map(messages.map((m) => [m.id, m]));

  return (
    <div className="flex-1 space-y-3 overflow-y-auto p-4">
      {messages.map((message) => {
        const isMine = message.sender.id === myId;
        return (
          <MessageBubble
            key={message.id}
            message={message}
            parent={message.parent_id ? byId.get(message.parent_id) : undefined}
            isMine={isMine}
            canManage={isMine || isAdmin}
            onReply={onReply}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        );
      })}
      <div ref={endRef} />
    </div>
  );
};

export default MessageList;
