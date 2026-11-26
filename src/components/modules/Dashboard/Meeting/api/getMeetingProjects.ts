import apiClient from "@/services/ApiClient";
import type { ApiBody, ProjectOption } from "../types/MeetingTypes";
import { extractList } from "../utils/meetingMappers";

export const getMeetingProjects = async (): Promise<ProjectOption[]> => {
  const res = (await apiClient.get("/projects?per_page=100")) as unknown as ApiBody;
  return extractList(res).map((p) => ({ id: p.id, name: p.name }));
};
