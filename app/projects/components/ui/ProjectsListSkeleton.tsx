import { Skeleton } from "@/components/ui/skeleton";

const ProjectsListSkeleton = () => {
  const skeletonItems = Array.from({ length: 23 });
  return (
    <>
      {skeletonItems.map((_, index) => (
        <div
          key={index}
          className="flex flex-col gap-6 p-4 border border-accent animate-pulse rounded-md h-auto shadow"
        >
          <div className="flex justify-between items-center">
            <Skeleton className="h-5 w-1/2 rounded-full" />
            <Skeleton className="h-5 w-5 rounded-full" />
          </div>
          <Skeleton className="h-5 w-full rounded-full" />
        </div>
      ))}
    </>
  );
};

export default ProjectsListSkeleton;
