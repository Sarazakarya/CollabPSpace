import { useState } from "react";
import { Plus } from "@/assets/icons/Icons";
import { useTranslation } from "react-i18next";
import ErrorState from "@/core/ui-states/ErrorState";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import useGetMeetings from "../hooks/useGetMeetings";
import AddMeetingModal from "../molecule/AddMeetingModal";
import MeetingsToolbar from "../molecule/MeetingsToolbar";
import WeekGrid from "../molecule/WeekGrid";
import { addDays, getLocale, startOfWeek } from "../utils/meetingUtils";

const MeetingsCalendar = () => {
  const { t, i18n } = useTranslation();
  const [weekStart, setWeekStart] = useState(() => startOfWeek(new Date()));
  const [openAdd, setOpenAdd] = useState(false);

  const { data: meetings = [], isLoading, isError } = useGetMeetings();

  const monthLabel = weekStart.toLocaleDateString(getLocale(i18n.language), {
    month: "long",
    year: "numeric",
  });

  if (isError) return <ErrorState />;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="ds-title-xl ds-text-primary">{t("nav.meetings")}</h1>

        <Button className="rounded-xl" onClick={() => setOpenAdd(true)}>
          <Plus className="size-4" />
          {t("meetings.add")}
        </Button>
      </div>

      <MeetingsToolbar
        monthLabel={monthLabel}
        onPrevious={() => setWeekStart((date) => addDays(date, -7))}
        onNext={() => setWeekStart((date) => addDays(date, 7))}
        onToday={() => setWeekStart(startOfWeek(new Date()))}
      />

      {isLoading ? (
        <Skeleton className="h-128 w-full rounded-xl" />
      ) : (
        <WeekGrid weekStart={weekStart} meetings={meetings} />
      )}

      <AddMeetingModal open={openAdd} setOpen={setOpenAdd} />
    </div>
  );
};

export default MeetingsCalendar;
