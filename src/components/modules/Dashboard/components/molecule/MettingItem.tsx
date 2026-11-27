import { CalendarDays } from "@/assets/icons/Icons";
import { useTranslation } from "react-i18next";
import Avatar from "../../../../common/Navbar/atoms/Avatar";
import type { MeetingItemProps } from "../types/DashboardType";

export default function MeetingItem({
  title,
  date,
  time,
  extra,
  people,
}: MeetingItemProps) {
  const { t } = useTranslation();

  return (
    <li className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-2">
        <span className="ds-text-sm ds-text-primary min-w-0 font-medium">
          {title}
        </span>

        <span className="ds-text-xs ds-text-secondary flex shrink-0 items-center gap-1">
          {date || t("dashboard.meetings.today")}
          <CalendarDays className="size-3" />
        </span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {people.map((person) => {
            const initials = person.name
              .trim()
              .split(/\s+/)
              .map((word) => word[0])
              .join("")
              .slice(0, 2)
              .toUpperCase();

            return (
              <span
                key={person.id}
                className="-me-2 rounded-full border-2 border-white"
              >
                <Avatar
                  src={person.avatar_url || undefined}
                  initials={initials}
                  size={34}
                />
              </span>
            );
          })}

          {extra > 0 && (
            <span className="ds-text-xs ds-text-secondary ms-3">+{extra}</span>
          )}
        </div>

        <span className="ds-text-xs ds-text-secondary">{time}</span>
      </div>
    </li>
  );
}
