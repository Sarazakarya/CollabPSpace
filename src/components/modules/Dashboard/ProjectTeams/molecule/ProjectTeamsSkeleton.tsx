import { Skeleton } from "@/components/ui/skeleton";

const ProjectTeamsSkeleton = () => {
  return (
    <div className="space-y-5">
      <Skeleton className="h-8 w-40" />

      <div className="grid gap-4 lg:grid-cols-2">
        {Array.from({ length: 2 }).map((_, index) => (
          <div key={index} className="space-y-4 rounded-xl border p-4">
            <div className="flex items-center justify-between">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-5 w-24" />
            </div>

            <Skeleton className="h-2 w-full" />

            <div className="flex justify-between">
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-4 w-12" />
            </div>

            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, memberIndex) => (
                <div
                  key={memberIndex}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <Skeleton className="size-10 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-28" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </div>

                  <Skeleton className="h-4 w-10" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectTeamsSkeleton;
