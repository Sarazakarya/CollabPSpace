import { useQueryClient } from "@tanstack/react-query";
import { useApiMutation } from "@/shared/hooks/useApiMutation";
import { markMessagesRead } from "../api/markMessagesRead";
import { chatKeys } from "./chatKeys";

const useMarkMessagesRead = (projectId: number) => {
  const queryClient = useQueryClient();

  return useApiMutation({
    mutationFn: () => markMessagesRead(projectId),

    options: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: chatKeys.unread(projectId) });
      },
    },
  });
};

export default useMarkMessagesRead;
