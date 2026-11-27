import { useNavigate } from "react-router-dom";
import { isAxiosError } from "axios";
import { useTranslation } from "react-i18next";

import { useApiMutation } from "@/shared/hooks/useApiMutation";
import { useAlert } from "@/shared/hooks/useAlert";
import type { ApiErrorResponse } from "@/shared/types/api-error-response";

import { verifyResetOtp } from "../api/passwordRecovery";

import type {
  VerifyResetOtpPayload,
  VerifyResetOtpResponse,
} from "../types/PasswordRecoveryTypes";

const useVerifyResetOtp = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { showAlert } = useAlert();

  const { isPending, mutate } = useApiMutation<
    VerifyResetOtpPayload,
    VerifyResetOtpResponse
  >({
    mutationFn: verifyResetOtp,
    options: {
      onSuccess: (_, variables) => {
        showAlert("success", t("auth.verifyOtpSuccess"));

        navigate("/reset-password", {
          state: {
            email: variables.email,
            otp: variables.otp,
          },
        });
      },

      onError: (error) => {
        const message = isAxiosError<ApiErrorResponse>(error)
          ? (error.response?.data?.message ?? t("auth.verifyOtpError"))
          : t("auth.verifyOtpError");

        showAlert("error", message);
      },
    },
  });

  return {
    isPending,
    onVerifyOtp: (data: VerifyResetOtpPayload) => mutate(data),
  };
};

export default useVerifyResetOtp;
