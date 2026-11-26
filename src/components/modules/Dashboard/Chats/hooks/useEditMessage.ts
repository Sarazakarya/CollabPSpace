import { useTranslation } from "react-i18next";
import { useQueryClient } from "@tanstack/react-query";
import { useApiMutation } from "@/shared/hooks/useApiMutation";
import { useAlert } from "@/shared/hooks/useAlert";
import { editMessage } from "../api/editMessage";
import { getApiErrorMessage } from "../data/chatUtils";
import { chatKeys } from "./chatKeys";

interface EditMessageVariables {
  id: number;
  message: string;
}

interface Props {
  projectId: number;
  onSuccess?: () => void;
}

const useEditMessage = ({ projectId, onSuccess }: Props) => {
  const { t } = useTranslation();
  const { showAlert } = useAlert();
  const queryClient = useQueryClient();

  return useApiMutation({
    mutationFn: ({ id, message }: EditMessageVariables) => editMessage(id, message),

    options: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: chatKeys.messages(projectId) });
        onSuccess?.();
      },

      onError: (error) => {
        showAlert("error", getApiErrorMessage(error) || t("chats.alerts.editError"));
      },
    },
  });
};

export default useEditMessage;
