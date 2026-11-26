export interface TeamApi {
  id: number;
  name: string;
  members_count: number;
}

export interface TeamsListResponse {
  success: boolean;
  message: string;
  data: {
    data: TeamApi[];
  };
}

export interface TeamOption {
  id: number;
  name: string;
  members: number;
}
