import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { FolderArchiveIcon, FolderXIcon } from "lucide-react";
import React from "react";

const EmptyBoardsList = () => {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FolderXIcon />
        </EmptyMedia>
        <EmptyTitle>No Boards Yet</EmptyTitle>
        <EmptyDescription>
          You haven&apos;t created any boards yet. Get started by creating
          your first board.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className="flex gap-2">
          <Button className="w-full h-auto shadow hover:shadow-lg transition cursor-pointer">
            Create Board
          </Button>
        </div>
      </EmptyContent>
    </Empty>
  );
};

export default EmptyBoardsList;
