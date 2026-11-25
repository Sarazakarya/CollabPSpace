import { useApiQuery } from "@/shared/hooks/useApiQuery";
import { getDashboard } from "../api/getDashboard";

export const useGetDashboard = () => {
  return useApiQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboard,
  });
};
