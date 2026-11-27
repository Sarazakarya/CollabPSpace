import { useNavigate } from "react-router-dom";
import { isAxiosError } from "axios";
import { TokenService } from "@/services/tokenService";
import { useApiMutation } from "@/shared/hooks/useApiMutation";
import { useAlert } from "@/shared/hooks/useAlert";
import { useTranslation } from "react-i18next";
import type { ApiErrorResponse } from "@/shared/types/api-error-response";

import { logout } from "../api/logout";
import type { LogoutResponse } from "../types/logOuttype";
import { useQueryClient } from "@tanstack/react-query";

const useLogout = () => {
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { isPending, mutate } = useApiMutation<void, LogoutResponse>({
    mutationFn: () => logout(),

    options: {
      onSuccess: () => {
        TokenService.removeToken();
  queryClient.clear();
        showAlert("success", t("auth.logoutSuccess"));
        navigate("/sign-in", { replace: true });
      },

      onError: (error) => {
        const message = isAxiosError<ApiErrorResponse>(error)
          ? (error.response?.data?.message ?? t("auth.logoutError"))
          : t("auth.logoutError");

        showAlert("error", message);
      },
    },
  });

  return {
    isPending,
    onLogout: () => mutate(),
  };
};

export default useLogout;
