export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface RegisterUser {
  id: number;
  name: string;
  email: string;
  job_title: string | null;
  about: string | null;
  years_of_experience: number | null;
  phone: string | null;
  avatar_url: string | null;
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

export interface RegisterResponse {
  success: boolean;
  message: string;
  data: {
    user: RegisterUser;
    token: string;
    token_type: string;
  };
}
