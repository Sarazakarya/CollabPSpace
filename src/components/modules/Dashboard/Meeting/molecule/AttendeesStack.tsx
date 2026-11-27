import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "../utils/meetingUtils";
import type { AttendanceProps } from "../types/MeetingTypes";

const AttendeesStack = ({ attendees, max = 3, className = "size-6" }: AttendanceProps) => {
  const visible = attendees.slice(0, max);
  const extra = attendees.length - visible.length;

  return (
    <div className="flex items-center -space-x-2 rtl:space-x-reverse">
      {visible.map((person) => (
        <Avatar key={person.id} className={`${className} ring-2 ring-background`}>
          <AvatarImage src={person.avatar_url ?? undefined} alt={person.name} />
          <AvatarFallback className="text-[10px]">{getInitials(person.name)}</AvatarFallback>
        </Avatar>
      ))}

      {extra > 0 && (
        <span
          className={`${className} ds-bg-muted ds-text-secondary flex items-center justify-center rounded-full text-[10px] font-medium ring-2 ring-background`}
        >
          +{extra}
        </span>
      )}
    </div>
  );
};

export default AttendeesStack;
