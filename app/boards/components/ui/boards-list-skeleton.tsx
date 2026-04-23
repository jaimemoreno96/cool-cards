import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const BoardsListSkeleton = () => {
  const skeletonItems = Array.from({ length: 8 });

  return (
    <div className="grid grid-cols-1 xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-2 gap-4 p-4 w-full">
      {skeletonItems.map((_, index) => (
        <AspectRatio
          ratio={16 / 9}
          key={index}
          className="flex flex-col gap-6 border border-accent animate-pulse rounded-md h-auto shadow"
        >
            <Skeleton className="w-full h-full aspect-video object-cover rounded-md" />
        </AspectRatio>
      ))}
    </div>
  );
};

export default BoardsListSkeleton;
