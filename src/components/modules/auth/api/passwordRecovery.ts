import apiClient from "@/services/ApiClient";
import type {
  ForgotPasswordPayload,
  ForgotPasswordResponse,
  VerifyResetOtpPayload,
  VerifyResetOtpResponse,
  ResetPasswordPayload,
  ResetPasswordResponse,
} from "../types/PasswordRecoveryTypes";

export const forgotPassword = async (
  data: ForgotPasswordPayload,
): Promise<ForgotPasswordResponse> => {
  return await apiClient.post<ForgotPasswordResponse>(
    "/auth/forgot-password",
    data,
  );
};

export const verifyResetOtp = async (
  data: VerifyResetOtpPayload,
): Promise<VerifyResetOtpResponse> => {
  return await apiClient.post<VerifyResetOtpResponse>(
    "/auth/verify-reset-otp",
    data,
  );
};

export const resetPassword = async (
  data: ResetPasswordPayload,
): Promise<ResetPasswordResponse> => {
  return await apiClient.post<ResetPasswordResponse>(
    "/auth/reset-password",
    data,
  );
};
