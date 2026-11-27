import { useQuery } from "@tanstack/react-query";
import { notificationKeys } from "./useNotifications";
import { getNotifications } from "../api/getNotifications";


export const useGetNotifications = () => {
  return useQuery({
    queryKey: notificationKeys.list,
    queryFn: getNotifications,
  });
};
