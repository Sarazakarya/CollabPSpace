import { useState } from "react";
import { Bot, Send } from "lucide-react";
import { useTranslation } from "react-i18next";
import DashboardCard from "./DashboardCard";
import { Button } from "@/components/ui/button";

export default function AskAICard() {
  const { t } = useTranslation();
  const [text, setText] = useState("");

  return (
    <DashboardCard
      title={t("dashboard.askAI.title")}
      className="ds-bg-brand-soft"
    >
      <div className="flex flex-1 flex-col items-center justify-center gap-3 py-4">
        <Bot className="ds-text-brand size-10" />
        <p className="ds-text-sm ds-text-primary">
          {t("dashboard.askAI.empty")}
        </p>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setText("");
        }}
        className="ds-bg-card flex items-end gap-2 rounded-xl border border-border p-3"
      >
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={t("dashboard.askAI.placeholder")}
          rows={3}
          className="ds-text-xs ds-text-primary flex-1 resize-none bg-transparent outline-none"
        />
        <button
          type="submit"
          aria-label={t("dashboard.askAI.send")}
          className="ds-text-secondary ds-hover"
        >
          <Send className="size-4 rtl:-scale-x-100" />
        </button>
      </form>
    </DashboardCard>
  );
}
