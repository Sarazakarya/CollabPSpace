import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { isAxiosError } from "axios";
import { useTranslation } from "react-i18next";

import { useApiMutation } from "@/shared/hooks/useApiMutation";
import { useAlert } from "@/shared/hooks/useAlert";
import type { ApiErrorResponse } from "@/shared/types/api-error-response";

import {
  forgotPasswordSchema,
  type ForgotPasswordValues,
} from "../schema/PasswordRecoverySchema";

import { forgotPassword } from "../api/passwordRecovery";

import type {
  ForgotPasswordPayload,
  ForgotPasswordResponse,
} from "../types/PasswordRecoveryTypes";

const useForgotPassword = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { showAlert } = useAlert();

  const schema = useMemo(() => forgotPasswordSchema(t), [t, i18n.language]);

  const form = useForm<ForgotPasswordValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
    },
  });

  const { isPending, mutate } = useApiMutation<
    ForgotPasswordPayload,
    ForgotPasswordResponse
  >({
    mutationFn: forgotPassword,
    options: {
      onSuccess: (_, variables) => {
        showAlert("success", t("auth.forgotPasswordSuccess"));

        navigate("/verify-otp", {
          state: {
            email: variables.email,
          },
        });
      },

      onError: (error) => {
        const message = isAxiosError<ApiErrorResponse>(error)
          ? (error.response?.data?.message ?? t("auth.forgotPasswordError"))
          : t("auth.forgotPasswordError");

        showAlert("error", message);
      },
    },
  });

  const onSubmit = (values: ForgotPasswordValues) => {
    mutate(values);
  };

  return {
    form,
    isPending,
    onSubmit: form.handleSubmit(onSubmit),
  };
};

export default useForgotPassword;
