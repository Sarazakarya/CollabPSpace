import { useParams } from "react-router-dom";
import ErrorState from "@/core/ui-states/ErrorState";
import useGetFiles from "../hooks/useGetFiles";
import FilesSkeleton from "../molecule/FilesSkeleton";
import RecentFiles from "../molecule/RecentFiles";
import AllFiles from "../molecule/AllFiles";

const ProjectFiles = () => {
  const { id = "" } = useParams();

  const { data, isLoading, isError } = useGetFiles(id ?? "");

  const files = data?.data?.data ?? [];

  if (isLoading) {
    return <FilesSkeleton />;
  }

  if (isError) {
    return <ErrorState />;
  }

  return (
    <div className="space-y-8">
      <RecentFiles files={files} />

      <AllFiles files={files} projectId={id ?? ""} />
    </div>
  );
};

export default ProjectFiles;
