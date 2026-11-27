
export type ApiBody = { data?: any };

export interface Attendee {
  id: number;
  name: string;
  avatar_url: string | null;
}

export interface TranscriptEntry {
  time: string;
  speaker: string;
  text: string;
}

export interface Meeting {
  id: number;
  title: string;
  description: string | null;
  notes: string | null;
  meeting_date: string; 
  start_time: string; 
  end_time: string;
  meeting_link: string | null;
  recording_url: string | null;
  project: { id: number; name: string };
  attendees: Attendee[];
  transcript: TranscriptEntry[];
}

export interface MeetingSummary {
  summary: string;
  key_points: string[];
  action_items: string[];
}

export interface ProjectOption {
  id: number;
  name: string;
}

export interface MemberOption {
  id: number;
  name: string;
}

// Pages
export interface AddMeetingProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export interface AttendanceProps {
  attendees: Attendee[];
  max?: number;
  className?: string;
}

export interface MeetingsProps {
  meeting: Meeting;
}

export interface MeetingToolbarProps {
  monthLabel: string;
  onPrevious: () => void;
  onNext: () => void;
  onToday: () => void;
}


export interface MeetingSummaryProps {
  meetingId: number;
}

export interface TranscriptProps {
  transcript: TranscriptEntry[];
}

export interface WeekGridProps {
  weekStart: Date;
  meetings: Meeting[];
}