import { FolderArchiveIcon, FolderPlusIcon, StarIcon } from "lucide-react";

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

const EmptyFavoriteProjectsList = () => {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FolderPlusIcon />
        </EmptyMedia>
        <EmptyTitle>No Favorite Projects Yet</EmptyTitle>
        <EmptyDescription>
          You haven&apos;t favorited any projects yet. Get started by favoriting
          your favorite projects.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className="flex gap-2">
          <StarIcon className="text-yellow-500 fill-current transition duration-200" />
        </div>
      </EmptyContent>
    </Empty>
  );
};

export default EmptyFavoriteProjectsList;
