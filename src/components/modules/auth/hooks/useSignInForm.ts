import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation, useNavigate } from "react-router-dom";
import { isAxiosError } from "axios";
import { TokenService } from "@/services/tokenService";
import { useApiMutation } from "@/shared/hooks/useApiMutation";
import type { ApiErrorResponse } from "@/shared/types/api-error-response";
import { Signschema, type SignInValues } from "../schema/SignInSchema";
import type { LoginPayload, LoginResponse } from "../types/Logintype";
import { getSignin } from "../api/getSignin";
import { useAlert } from "@/shared/hooks/useAlert";
import { useTranslation } from "react-i18next";
import { useEffect, useMemo } from "react";

const useSignInForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { showAlert } = useAlert();
  const { t, i18n } = useTranslation();

  const schema = useMemo(() => Signschema(t), [t, i18n.language]);

  const from =
    (location.state as { from?: { pathname?: string } })?.from?.pathname ?? "/";

  const {
    register,
    control,
    trigger,
    handleSubmit,
    formState: { errors, submitCount },
  } = useForm<SignInValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  useEffect(() => {
    if (submitCount > 0) {
      trigger();
    }
  }, [i18n.language, trigger, submitCount]);
  const { isPending, mutate } = useApiMutation<
    LoginPayload & { remember: boolean },
    LoginResponse
  >({
    mutationFn: ({ remember, ...data }) => getSignin({ data }),

    options: {
      onSuccess: (response, variables) => {
        TokenService.setToken(response.data.token, variables.remember);

        showAlert("success", t("auth.loginSuccess"));
        navigate(from, { replace: true });
      },

      onError: (error) => {
        const message = isAxiosError<ApiErrorResponse>(error)
          ? (error.response?.data?.message ?? t("auth.loginError"))
          : t("auth.loginError");

        showAlert("error", message);
      },
    },
  });

  const onSubmit = (values: SignInValues) => {
    mutate(values);
  };

  return {
    register,
    control,
    handleSubmit,
    errors,
    isPending,
    onSubmit,
  };
};

export default useSignInForm;
