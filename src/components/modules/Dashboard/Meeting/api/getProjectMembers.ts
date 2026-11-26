import apiClient from "@/services/ApiClient";
import type { ApiBody, MemberOption } from "../types/MeetingTypes";

const getData = (url: string) =>
  apiClient.get(url) as unknown as Promise<ApiBody>;
export const getProjectMembers = async (
  projectId: number,
): Promise<MemberOption[]> => {
  const projectResponse = await getData(`/projects/${projectId}/overview`);
  const project = projectResponse.data || {};

  const allMembers = [...(project.direct_members || [])];

  for (const team of project.teams || []) {
    const teamResponse = await getData(`/teams/${team.id}`);
    const teamData = teamResponse.data?.team || teamResponse.data || {};
    allMembers.push(...(teamData.members || []));
  }

  const members: MemberOption[] = [];

  for (const member of allMembers) {
    const user = member.user || member;
    const alreadyAdded = members.some((item) => item.id === user.id);

    if (!alreadyAdded) {
      members.push({ id: user.id, name: user.name });
    }
  }

  return members;
};
