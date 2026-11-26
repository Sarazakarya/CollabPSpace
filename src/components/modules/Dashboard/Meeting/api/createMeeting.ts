import apiClient from "@/services/ApiClient";
import type { MeetingFormValues } from "../utils/meetingSchema";
import { toApiTime } from "../utils/meetingUtils";

export const createMeeting = (values: MeetingFormValues) => {
  return apiClient.post("/meetings", {
    project_id: values.project_id,
    title: values.title,
    meeting_date: values.meeting_date,
    start_time: toApiTime(values.start_time),
    end_time: toApiTime(values.end_time),
    ...(values.description && { description: values.description }),
    ...(values.meeting_link && { meeting_link: values.meeting_link }),
    // the docs say "attendee_ids" but the example body uses "participants": send both
    attendee_ids: values.attendee_ids,
    participants: values.attendee_ids,
  });
};
