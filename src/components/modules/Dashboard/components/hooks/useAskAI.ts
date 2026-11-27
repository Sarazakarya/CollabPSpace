import { useState } from "react";
import { useTranslation } from "react-i18next";
import { isAxiosError } from "axios";
import { useApiMutation } from "@/shared/hooks/useApiMutation";
import { useAlert } from "@/shared/hooks/useAlert";
import type { ApiErrorResponse } from "@/shared/types/api-error-response";
import { askAI } from "../api/askAI";
import type { AIMessage } from "../types/AskAi";

const useAskAI = () => {
  const { t } = useTranslation();
  const { showAlert } = useAlert();

  const [messages, setMessages] = useState<AIMessage[]>([]);

  const addMessage = (role: AIMessage["role"], text: string) => {
    const newMessage = {
      id: Date.now(),
      role,
      text,
    };

    setMessages((previous) => [...previous, newMessage]);
  };

  const mutation = useApiMutation({
    mutationFn: (prompt: string) => askAI(prompt),

    options: {
      onSuccess: (answer: string) => {
        addMessage("assistant", answer || t("dashboard.askAI.noAnswer"));
      },

      onError: (error) => {
        let errorMessage = t("dashboard.askAI.error");

        if (isAxiosError<ApiErrorResponse>(error)) {
          errorMessage = error.response?.data?.message || errorMessage;
        }

        showAlert("error", errorMessage);
      },
    },
  });

  const send = (prompt: string) => {
    addMessage("user", prompt);
    mutation.mutate(prompt);
  };

  return {
    messages,
    send,
    isPending: mutation.isPending,
  };
};

export default useAskAI;
