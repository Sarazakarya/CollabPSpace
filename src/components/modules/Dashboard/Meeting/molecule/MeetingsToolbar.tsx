import { ChevronLeft, ChevronRight } from "@/assets/icons/Icons";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import type { MeetingToolbarProps } from "../types/MeetingTypes";

const MeetingsToolbar = ({
  monthLabel,
  onPrevious,
  onNext,
  onToday,
}: MeetingToolbarProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          aria-label={t("meetings.previousWeek")}
          onClick={onPrevious}
        >
          <ChevronLeft className="size-4 rtl:rotate-180" />
        </Button>

        <p className="ds-title-md ds-text-primary min-w-40 text-center">
          {monthLabel}
        </p>

        <Button
          variant="outline"
          size="icon"
          aria-label={t("meetings.nextWeek")}
          onClick={onNext}
        >
          <ChevronRight className="size-4 rtl:rotate-180" />
        </Button>
      </div>

      <Button variant="outline" onClick={onToday}>
        {t("meetings.today")}
      </Button>
    </div>
  );
};

export default MeetingsToolbar;
