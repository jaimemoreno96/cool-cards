import { Skeleton } from "@/components/ui/skeleton";

const ProjectsListSkeleton = () => {
  const skeletonItems = Array.from({ length: 8 });
  return (
    <div className="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-4 p-4 w-full h-auto">
      {skeletonItems.map((_, index) => (
        <div
          key={index}
          className="flex flex-col gap-6 p-4 border border-accent animate-pulse rounded-md h-auto shadow"
        >
          <div className="flex justify-between items-center">
            <Skeleton className="h-5 w-1/2 rounded-full" />
            <Skeleton className="h-5 w-5 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectsListSkeleton;
