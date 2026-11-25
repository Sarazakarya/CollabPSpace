import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TokenService } from "@/services/tokenService";
import { RegisterSchema, type RegisterValues } from "../schema/RegisterSchema";
import { useApiMutation } from "@/shared/hooks/useApiMutation";
import type { RegisterPayload, RegisterResponse } from "../types/SignUptype";
import { getSignUp } from "../api/getSignUp";
import { useAlert } from "@/shared/hooks/useAlert";
import { useTranslation } from "react-i18next";
import { useEffect, useMemo } from "react";

const useSignUpForm = () => {
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const { t, i18n } = useTranslation();

  const schema = useMemo(() => RegisterSchema(t), [t, i18n.language]);

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors, submitCount },
  } = useForm<RegisterValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
  });
  useEffect(() => {
    if (submitCount > 0) {
      trigger();
    }
  }, [i18n.language, trigger, submitCount]);

  const { isPending, mutate } = useApiMutation<
    RegisterPayload,
    RegisterResponse
  >({
    mutationFn: (data) => getSignUp({ data }),
    options: {
      onSuccess: (response) => {
        TokenService.setToken(response.data.token, true);
        showAlert("success", response.message);
        navigate("/", { replace: true });
      },
      onError: () => {
        showAlert("error", t("auth.registerError"));
      },
    },
  });

  const onSubmit = (values: RegisterValues) => {
    mutate(values);
  };

  return {
    register,
    handleSubmit,
    errors,
    isPending,
    onSubmit,
  };
};

export default useSignUpForm;
