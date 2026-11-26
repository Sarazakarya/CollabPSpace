import { Skeleton } from "@/components/ui/skeleton";

const MeetingDetailsSkeleton = () => {
  return (
    <div className="space-y-6">
      <Skeleton className="h-20 w-full rounded-xl" />
      <Skeleton className="aspect-video w-full rounded-2xl" />
    </div>
  );
};

export default MeetingDetailsSkeleton;
