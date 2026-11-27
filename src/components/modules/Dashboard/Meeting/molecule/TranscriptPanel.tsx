import { useState } from "react";
import { Search } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import type {  TranscriptProps } from "../types/MeetingTypes";

const TranscriptPanel = ({ transcript }: TranscriptProps) => {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");

  const query = search.trim().toLowerCase();
  const entries = transcript.filter(
    (entry) =>
      entry.text.toLowerCase().includes(query) || entry.speaker.toLowerCase().includes(query),
  );

  return (
    <aside className="ds-card flex flex-col gap-4 self-start lg:sticky lg:top-4">
      <h3 className="ds-title-md ds-text-primary">{t("meetings.transcripts.title")}</h3>

      <div className="relative">
        <Search className="ds-text-secondary pointer-events-none absolute inset-s-3 top-1/2 size-4 -translate-y-1/2" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t("meetings.transcripts.search")}
          className="h-10 rounded-full ps-9"
        />
      </div>

      <div className="max-h-144 space-y-4 overflow-y-auto">
        {transcript.length === 0 ? (
          <p className="ds-text-sm ds-text-disabled text-center">{t("meetings.transcripts.empty")}</p>
        ) : entries.length === 0 ? (
          <p className="ds-text-sm ds-text-disabled text-center">
            {t("meetings.transcripts.noResults")}
          </p>
        ) : (
          entries.map((entry, index) => (
            <div key={`${entry.time}-${index}`} className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="ds-bg-muted ds-text-secondary rounded-full px-2 py-0.5 text-xs">
                  {entry.time}
                </span>
                <span className="ds-text-sm ds-text-primary font-medium">{entry.speaker}</span>
              </div>
              <p className="ds-text-sm ds-text-secondary leading-relaxed">{entry.text}</p>
            </div>
          ))
        )}
      </div>
    </aside>
  );
};

export default TranscriptPanel;
