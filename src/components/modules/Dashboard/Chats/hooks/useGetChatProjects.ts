import { useQuery } from "@tanstack/react-query";
import { getChatProjects } from "../api/getChatProjects";
import { chatKeys } from "./chatKeys";

const useGetChatProjects = () =>
  useQuery({ queryKey: chatKeys.projects, queryFn: getChatProjects });

export default useGetChatProjects;
