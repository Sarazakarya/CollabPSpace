import { useQuery } from "@tanstack/react-query";
import { getMessages } from "../api/getMessages";
import type { ChatMessage } from "../types/ChatTypes";
import { chatKeys } from "./chatKeys";

const sortOldestFirst = (list: ChatMessage[]) =>
  [...list].sort((a, b) => +new Date(a.created_at) - +new Date(b.created_at));

const useGetMessages = (projectId: number) =>
  useQuery({
    queryKey: chatKeys.messages(projectId),
    queryFn: () => getMessages(projectId),
    select: sortOldestFirst,
    enabled: Number.isFinite(projectId),
    refetchInterval: 5000,
  });

export default useGetMessages;
