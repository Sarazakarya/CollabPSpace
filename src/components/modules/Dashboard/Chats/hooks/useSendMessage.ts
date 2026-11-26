import { useTranslation } from "react-i18next";
import { useQueryClient } from "@tanstack/react-query";
import { useApiMutation } from "@/shared/hooks/useApiMutation";
import { useAlert } from "@/shared/hooks/useAlert";
import { sendMessage } from "../api/sendMessage";
import { uploadChatFile } from "../api/uploadChatFile";
import { getApiErrorMessage } from "../data/chatUtils";
import { chatKeys } from "./chatKeys";

interface SendMessageVariables {
  message: string;
  parentId?: number | null;
  file?: File | null;
}

interface Props {
  projectId: number;
  onSuccess?: () => void;
}

const useSendMessage = ({ projectId, onSuccess }: Props) => {
  const { t } = useTranslation();
  const { showAlert } = useAlert();
  const queryClient = useQueryClient();

  return useApiMutation({
    mutationFn: async ({ message, parentId, file }: SendMessageVariables) => {
      const fileId = file ? await uploadChatFile(projectId, file) : null;
      return sendMessage(projectId, {
        message,
        parent_id: parentId ?? null,
        file_attachment_id: fileId,
      });
    },

    options: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: chatKeys.messages(projectId) });
        onSuccess?.();
      },

      onError: (error) => {
        showAlert("error", getApiErrorMessage(error) || t("chats.alerts.sendError"));
      },
    },
  });
};

export default useSendMessage;
