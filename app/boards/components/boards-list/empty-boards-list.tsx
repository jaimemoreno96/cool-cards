import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { FolderXIcon } from "lucide-react";
import React from "react";
import NewBoard from "./new-board";

interface EmptyBoardsListProps {
  userId?: string;
  projectId?: string;
}

const EmptyBoardsList = ({ userId, projectId }: EmptyBoardsListProps) => {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FolderXIcon />
        </EmptyMedia>
        <EmptyTitle>No Boards Yet</EmptyTitle>
        <EmptyDescription>
          You haven&apos;t created any boards yet. Get started by creating your
          first board.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className="flex gap-2">
          <NewBoard userId={userId || ""} projectId={projectId}>
            <Button className="w-full h-auto shadow hover:shadow-lg transition cursor-pointer">
              Create Board
            </Button>
          </NewBoard>
        </div>
      </EmptyContent>
    </Empty>
  );
};

export default EmptyBoardsList;
