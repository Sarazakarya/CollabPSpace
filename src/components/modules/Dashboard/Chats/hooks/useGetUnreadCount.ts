import { useQuery } from "@tanstack/react-query";
import { getUnreadCount } from "../api/getUnreadCount";
import { chatKeys } from "./chatKeys";

const useGetUnreadCount = (projectId: number) =>
  useQuery({
    queryKey: chatKeys.unread(projectId),
    queryFn: () => getUnreadCount(projectId),
    refetchInterval: 15000,
  });

export default useGetUnreadCount;
