import { Skeleton } from "@/components/ui/skeleton";

const ProjectTasSkeleton = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {[1, 2, 3, 4].map((column) => (
        <div key={column} className="space-y-4 rounded-xl border p-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-28" />
            <Skeleton className="size-6 rounded-full" />
          </div>

          <Skeleton className="h-10 w-full rounded-full" />

          {[1, 2, 3].map((task) => (
            <div key={task} className="space-y-3 rounded-lg border p-4">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-1/2" />

              <div className="flex items-center justify-between">
                <Skeleton className="size-8 rounded-full" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ProjectTasSkeleton;
