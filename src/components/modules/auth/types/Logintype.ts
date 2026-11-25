export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginUser {
  id: number;
  name: string;
  email: string;
  job_title: string;
  about: string;
  years_of_experience: number;
  phone: string;
  avatar_url: string;
  status: string;
  available_status: string;
  current_project_id: number | null;
  roles: string[];
  permissions: string[];
  google_linked: boolean;
  facebook_linked: boolean;
  linkedin_linked: boolean;
  created_at: string;
  updated_at: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    user: LoginUser;
    token: string;
    token_type: string;
  };
}
