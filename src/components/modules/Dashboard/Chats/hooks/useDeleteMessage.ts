import { useTranslation } from "react-i18next";
import { useQueryClient } from "@tanstack/react-query";
import { useApiMutation } from "@/shared/hooks/useApiMutation";
import { useAlert } from "@/shared/hooks/useAlert";
import { deleteMessage } from "../api/deleteMessage";
import { getApiErrorMessage } from "../data/chatUtils";
import { chatKeys } from "./chatKeys";

interface Props {
  projectId: number;
  onSuccess?: () => void;
}

const useDeleteMessage = ({ projectId, onSuccess }: Props) => {
  const { t } = useTranslation();
  const { showAlert } = useAlert();
  const queryClient = useQueryClient();

  return useApiMutation({
    mutationFn: (messageId: number) => deleteMessage(messageId),

    options: {
      onSuccess: () => {
        showAlert("success", t("chats.alerts.messageDeleted"));
        queryClient.invalidateQueries({ queryKey: chatKeys.messages(projectId) });
        onSuccess?.();
      },

      onError: (error) => {
        showAlert("error", getApiErrorMessage(error) || t("chats.alerts.deleteError"));
      },
    },
  });
};

export default useDeleteMessage;
