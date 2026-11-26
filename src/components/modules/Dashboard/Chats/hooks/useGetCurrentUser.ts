import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../api/getCurrentUser";
import { chatKeys } from "./chatKeys";

const useGetCurrentUser = () => {
  const { data } = useQuery({
    queryKey: chatKeys.me,
    queryFn: getCurrentUser,
    staleTime: Infinity,
  });

  return { myId: data?.id, isAdmin: data?.isAdmin ?? false };
};

export default useGetCurrentUser;
