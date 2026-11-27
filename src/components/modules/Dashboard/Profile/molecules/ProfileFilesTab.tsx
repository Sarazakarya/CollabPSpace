import { Skeleton } from "@/components/ui/skeleton";
import type {
  ProfileFileItem,
  ProfileFilesTabProps,
} from "../types/profile.types";
import { ProfileFileCard } from "../molecules/ProfileFileCard";

const FALLBACK_FILES: ProfileFileItem[] = Array.from(
  { length: 9 },
  (_, index) => ({
    id: index + 1,
    name: "Design mockups",
    size_formatted: "6.4 MB",
    time_ago: "1h ago",
    uploader: {
      id: 1,
      name: "Ahmed Hassan",
    },
  }),
);

export const ProfileFilesTab = ({
  files,
  isLoading = false,
}: ProfileFilesTabProps) => {
  const resolvedFiles = files && files.length > 0 ? files : FALLBACK_FILES;

  return (
    <div className="grid grid-cols-1 gap-4 pt-2 sm:grid-cols-2 lg:grid-cols-3">
      {isLoading
        ? Array.from({ length: 6 }, (_, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-4"
            >
              <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-xl" />

                <div className="space-y-2">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </div>

              <Skeleton className="h-6 w-6 rounded-md" />
            </div>
          ))
        : resolvedFiles.map((file) => (
            <ProfileFileCard key={file.id} file={file} />
          ))}
    </div>
  );
};
