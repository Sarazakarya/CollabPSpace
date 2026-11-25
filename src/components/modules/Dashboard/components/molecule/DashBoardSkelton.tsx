import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardSkeleton() {
  return (
    <div className="flex flex-col gap-5 md:gap-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="space-y-3 rounded-xl border p-4">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-3 w-20" />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {[1, 2, 3].map((item) => (
          <div key={item} className="space-y-4 rounded-xl border p-4">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="space-y-4 rounded-xl border p-4">
            <Skeleton className="h-5 w-28" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    </div>
  );
}
