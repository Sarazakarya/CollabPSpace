export interface ApiSuccessResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface ForgotPasswordPayload {
  email: string;
}

export type ForgotPasswordResponse = ApiSuccessResponse<{
  expires_in_minutes: number;
}>;

export interface VerifyResetOtpPayload {
  email: string;
  otp: string;
}

export type VerifyResetOtpResponse = ApiSuccessResponse<null>;

export interface ResetPasswordPayload {
  email: string;
  otp: string;
  password: string;
  password_confirmation: string;
}

export type ResetPasswordResponse = ApiSuccessResponse<null>;
