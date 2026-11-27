import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { isAxiosError } from "axios";
import { useTranslation } from "react-i18next";

import { TokenService } from "@/services/tokenService";
import { useApiMutation } from "@/shared/hooks/useApiMutation";
import { useAlert } from "@/shared/hooks/useAlert";
import type { ApiErrorResponse } from "@/shared/types/api-error-response";

import {
  resetPasswordSchema,
  type ResetPasswordValues,
} from "../schema/PasswordRecoverySchema";

import { resetPassword } from "../api/passwordRecovery";

import type {
  ResetPasswordPayload,
  ResetPasswordResponse,
} from "../types/PasswordRecoveryTypes";

const useResetPassword = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { showAlert } = useAlert();

  const schema = useMemo(() => resetPasswordSchema(t), [t, i18n.language]);

  const form = useForm<ResetPasswordValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      otp: "",
      password: "",
      password_confirmation: "",
    },
  });

  const { isPending, mutate } = useApiMutation<
    ResetPasswordPayload,
    ResetPasswordResponse
  >({
    mutationFn: resetPassword,
    options: {
      onSuccess: () => {
        TokenService.removeToken();

        showAlert("success", t("auth.resetPasswordSuccess"));

        navigate("/sign-in", { replace: true });
      },

      onError: (error) => {
        const message = isAxiosError<ApiErrorResponse>(error)
          ? (error.response?.data?.message ?? t("auth.resetPasswordError"))
          : t("auth.resetPasswordError");

        showAlert("error", message);
      },
    },
  });

  const onSubmit = (values: ResetPasswordValues) => {
    mutate(values);
  };

  return {
    form,
    isPending,
    onSubmit: form.handleSubmit(onSubmit),
  };
};

export default useResetPassword;
