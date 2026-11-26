
import type {
  ApiBody,
  Attendee,
  Meeting,
  MeetingSummary,
  TranscriptEntry,
} from "../types/MeetingTypes";

export const extractList = (res: ApiBody): any[] =>
  Array.isArray(res?.data)
    ? res.data
    : Array.isArray(res?.data?.data)
      ? res.data.data
      : [];

const toAttendee = (raw: any): Attendee => {
  const user = raw.user ?? raw;
  return { id: user.id, name: user.name ?? "", avatar_url: user.avatar_url ?? null };
};

const toTranscript = (raw: any): TranscriptEntry[] =>
  Array.isArray(raw)
    ? raw.map((entry) => ({
        time: String(entry.timestamp ?? entry.time ?? ""),
        speaker: entry.speaker ?? entry.speaker_name ?? entry.user?.name ?? "",
        text: entry.text ?? entry.content ?? "",
      }))
    : [];

export const toMeeting = (raw: any): Meeting => {
  const project = raw.project ?? {};

  return {
    id: raw.id,
    title: raw.title ?? "",
    description: raw.description ?? null,
    notes: raw.notes ?? null,
    meeting_date: String(raw.meeting_date ?? "").slice(0, 10),
    start_time: raw.start_time ?? "00:00:00",
    end_time: raw.end_time ?? "00:00:00",
    meeting_link: raw.meeting_link ?? null,
    recording_url: raw.recording_url ?? raw.video_url ?? null,
    project: { id: project.id ?? raw.project_id, name: project.name ?? raw.project_name ?? "" },
    attendees: (raw.attendees ?? raw.participants ?? []).map(toAttendee),
    transcript: toTranscript(raw.transcript ?? raw.transcripts),
  };
};

const toStringList = (raw: any): string[] =>
  Array.isArray(raw)
    ? raw
        .map((item) =>
          typeof item === "string" ? item : (item?.title ?? item?.description ?? item?.name ?? ""),
        )
        .filter(Boolean)
    : [];

export const toSummary = (res: ApiBody): MeetingSummary | null => {
  const data = res?.data;
  const d = data?.summary && typeof data.summary === "object" ? data.summary : data;
  if (!d || !(d.summary || d.decisions_made || d.key_points || d.action_items)) return null;

  return {
    summary: typeof d.summary === "string" ? d.summary : "",
    key_points: toStringList(d.key_points ?? d.decisions_made),
    action_items: toStringList(d.action_items),
  };
};
