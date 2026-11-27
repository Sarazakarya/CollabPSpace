import { useApiQuery } from "@/shared/hooks/useApiQuery";
import { notificationKeys } from "./useNotifications";
import { getUnreadNotificationsCount } from "../api/getUnreadNotificationsCount";

export const useGetUnreadCount = () => {
  return useApiQuery({
    queryKey: notificationKeys.unreadCount,
    queryFn: getUnreadNotificationsCount,
  });
};
