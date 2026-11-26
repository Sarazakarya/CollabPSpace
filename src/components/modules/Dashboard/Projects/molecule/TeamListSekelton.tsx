import { Skeleton } from "@/components/ui/skeleton";

export default function TeamListSkeleton() {
  return (
    <div className="space-y-3 p-2">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="flex items-center gap-4 rounded-lg px-3 py-3"
        >
          <Skeleton className="h-4 w-4 rounded" />

          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
      ))}
    </div>
  );
}
