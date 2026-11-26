import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import useGetChatProjects from "../hooks/useGetChatProjects";
import useGetCurrentUser from "../hooks/useGetCurrentUser";
import useGetMessages from "../hooks/useGetMessages";
import useSendMessage from "../hooks/useSendMessage";
import useEditMessage from "../hooks/useEditMessage";
import useDeleteMessage from "../hooks/useDeleteMessage";
import useMarkMessagesRead from "../hooks/useMarkMessagesRead";
import type { ChatMessage } from "../types/ChatTypes";
import MessageList from "./MessageList";
import ChatHeader from "./ChatHeader";
import MessageComposer from "./MessageComposer";
import DeleteMessageDialog from "./DeleteMessageDialog";

const ChatConversation = () => {
  const { t } = useTranslation();
  const { projectId } = useParams();
  const id = Number(projectId);

  const { data: projects = [] } = useGetChatProjects();
  const { data: messages = [], isLoading, isError, refetch } = useGetMessages(id);
  const { myId, isAdmin } = useGetCurrentUser();

  const [replyTo, setReplyTo] = useState<ChatMessage | null>(null);
  const [editing, setEditing] = useState<ChatMessage | null>(null);
  const [toDelete, setToDelete] = useState<ChatMessage | null>(null);
  const [composerKey, setComposerKey] = useState(0);

  const resetComposer = () => {
    setReplyTo(null);
    setEditing(null);
    setComposerKey((key) => key + 1);
  };

  const sendMutation = useSendMessage({ projectId: id, onSuccess: resetComposer });
  const editMutation = useEditMessage({ projectId: id, onSuccess: resetComposer });
  const deleteMutation = useDeleteMessage({ projectId: id });
  const markRead = useMarkMessagesRead(id);

  const projectName = projects.find((p) => p.id === id)?.name ?? "";

  useEffect(() => {
    setReplyTo(null);
    setEditing(null);
  }, [id]);

  useEffect(() => {
    if (messages.length > 0) markRead.mutate();
  }, [id, messages.length]);

  const handleSubmit = (text: string, file: File | null) => {
    if (editing) {
      editMutation.mutate({ id: editing.id, message: text });
      return;
    }

    sendMutation.mutate({ message: text, parentId: replyTo?.id, file });
  };

  const handleConfirmDelete = () => {
    if (!toDelete) return;

    deleteMutation.mutate(toDelete.id);
    setToDelete(null);
  };

  return (
    <>
      <ChatHeader name={projectName} />

      {isLoading ? (
        <div className="flex-1 space-y-3 p-4">
          <Skeleton className="h-12 w-2/3 rounded-2xl" />
          <Skeleton className="ms-auto h-12 w-1/2 rounded-2xl" />
          <Skeleton className="h-12 w-3/5 rounded-2xl" />
        </div>
      ) : isError ? (
        <div className="ds-text-secondary flex flex-1 flex-col items-center justify-center gap-3">
          <p className="text-sm">{t("chats.loadError")}</p>
          <Button variant="outline" onClick={() => refetch()}>
            {t("errorState.retry")}
          </Button>
        </div>
      ) : (
        <MessageList
          messages={messages}
          myId={myId}
          isAdmin={isAdmin}
          onReply={(message) => {
            setEditing(null);
            setReplyTo(message);
          }}
          onEdit={(message) => {
            setReplyTo(null);
            setEditing(message);
          }}
          onDelete={setToDelete}
        />
      )}

      <MessageComposer
        key={`${id}-${composerKey}`}
        replyTo={replyTo}
        editing={editing}
        isSending={sendMutation.isPending || editMutation.isPending}
        onCancel={() => {
          setReplyTo(null);
          setEditing(null);
        }}
        onSubmit={handleSubmit}
      />

      <DeleteMessageDialog
        open={toDelete !== null}
        onOpenChange={(open) => !open && setToDelete(null)}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
};

export default ChatConversation;
