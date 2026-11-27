import { useEffect, useRef, useState } from "react";
import { Bot, Send } from "@/assets/icons/Icons";
import { useTranslation } from "react-i18next";
import DashboardCard from "./DashboardCard";
import useAskAI from "../hooks/useAskAI";

export default function AskAICard() {
  const { t } = useTranslation();
  const { messages, send, isPending } = useAskAI();
  const [text, setText] = useState("");
  const listRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const list = listRef.current;
    if (list) list.scrollTop = list.scrollHeight;
  }, [messages.length, isPending]);

  const submit = () => {
    const prompt = text.trim();
    if (!prompt || isPending) return;

    send(prompt);
    setText("");
  };

  return (
    <DashboardCard
      title={t("dashboard.askAI.title")}
      className="ds-bg-brand-soft"
    >
      <div
        ref={listRef}
        className="flex max-h-64 min-h-40 flex-1 flex-col gap-2 overflow-y-auto py-2"
      >
        {messages.length === 0 && !isPending ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 py-4">
            <Bot className="ds-text-brand size-10" />
            <p className="ds-text-sm ds-text-primary">
              {t("dashboard.askAI.empty")}
            </p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`ds-text-xs max-w-[85%] rounded-xl px-3 py-2 whitespace-pre-wrap ${
                message.role === "user"
                  ? "ds-bg-brand ds-text-white self-end"
                  : "ds-bg-card ds-text-primary self-start border border-border"
              }`}
            >
              {message.text}
            </div>
          ))
        )}

        {isPending && (
          <p className="ds-text-xs ds-text-secondary self-start">
            {t("dashboard.askAI.thinking")}
          </p>
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
        className="ds-bg-card flex items-end gap-2 rounded-xl border border-border p-3"
      >
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              submit();
            }
          }}
          placeholder={t("dashboard.askAI.placeholder")}
          rows={3}
          className="ds-text-xs ds-text-primary flex-1 resize-none bg-transparent outline-none"
        />
        <button
          type="submit"
          disabled={isPending || !text.trim()}
          aria-label={t("dashboard.askAI.send")}
          className="ds-text-secondary ds-hover disabled:opacity-50"
        >
          <Send className="size-4 rtl:-scale-x-100" />
        </button>
      </form>
    </DashboardCard>
  );
}
