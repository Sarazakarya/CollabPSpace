import { useEffect, useRef, useState, type FormEvent } from "react";
import { Paperclip, Send, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { ChatMessage } from "../types/ChatTypes";

interface Props {
  replyTo: ChatMessage | null;
  editing: ChatMessage | null;
  isSending: boolean;
  onCancel: () => void;
  onSubmit: (text: string, file: File | null) => void;
}

const MessageComposer = ({ replyTo, editing, isSending, onCancel, onSubmit }: Props) => {
  const { t } = useTranslation();
  const fileRef = useRef<HTMLInputElement>(null);
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    setText(editing?.message ?? "");
    setFile(null);
  }, [editing]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const value = text.trim() || file?.name || "";
    if (!value || isSending) return;

    onSubmit(value, file);
  };

  const banner = editing
    ? t("chats.editingMessage")
    : replyTo
      ? t("chats.replyingTo", { name: replyTo.sender.name })
      : null;

  return (
    <div className="border-t border-border p-3">
      {banner && (
        <div className="ds-bg-muted mb-2 flex items-center justify-between gap-2 rounded-lg px-3 py-2">
          <div className="min-w-0">
            <p className="ds-text-brand text-xs font-semibold">{banner}</p>
            {replyTo && !editing && (
              <p className="ds-text-secondary line-clamp-1 text-xs">{replyTo.message}</p>
            )}
          </div>
          <button type="button" onClick={onCancel} aria-label={t("common.cancel")}>
            <X className="ds-text-secondary size-4" />
          </button>
        </div>
      )}

      {file && (
        <p className="ds-text-secondary mb-2 flex items-center gap-1.5 text-xs">
          <Paperclip className="size-3.5" />
          <span className="truncate">{file.name}</span>
          <button type="button" onClick={() => setFile(null)} aria-label={t("common.cancel")}>
            <X className="size-3.5" />
          </button>
        </p>
      )}

      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <input
          ref={fileRef}
          type="file"
          hidden
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        />

        {!editing && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label={t("chats.attach")}
            onClick={() => fileRef.current?.click()}
          >
            <Paperclip className="size-5" />
          </Button>
        )}

        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={t("chats.writeMessage")}
          className="h-11 flex-1 rounded-xl"
        />

        <Button
          type="submit"
          size="icon"
          aria-label={t("chats.send")}
          disabled={isSending || (!text.trim() && !file)}
          className="size-11 rounded-xl"
        >
          <Send className="size-5 rtl:-scale-x-100" />
        </Button>
      </form>
    </div>
  );
};

export default MessageComposer;
