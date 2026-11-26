import { useOutletContext } from "react-router-dom";
import type { ProjectOverview } from "../types/overviewtype";
export const useOverViewProject = () =>
  useOutletContext<{
    project: ProjectOverview;
    isLoading: boolean;
  }>();
