"use client";

import { Button } from "@/components/ui/button";
import { useBoards } from "../../hooks/use-boards";
import { BoardDtoType } from "../../types/boards";
import EmptyBoardsList from "./empty-boards-list";
import NewBoard from "./new-board";
import { ArrowUpIcon, Loader2, PlusIcon } from "lucide-react";
import BoardItem from "./board-item";
import { useBoardsStore } from "@/app/store/boards";
import BoardsListSkeleton from "../ui/boards-list-skeleton";

interface BoardsListProps {
  userId?: string;
  projectId?: string;
}
const BoardsList = ({ userId, projectId }: BoardsListProps) => {
  const { boards, boardsError, boardsIsLoading, updateFavoriteBoards } =
    useBoards(userId, projectId);

  const { optimisticBoards } = useBoardsStore();

  if (boardsError) return <div>Failed to load boards</div>;
  if (boardsIsLoading) return <BoardsListSkeleton />;

  const realBoards = boards?.filter((b) => !b.id.startsWith("temp-")) || [];
  const optimisticBoardsList =
    boards?.filter((b) => b.id.startsWith("temp-")) || [];

  if (realBoards.length === 0 && optimisticBoardsList.length === 0) {
    return <EmptyBoardsList userId={userId} projectId={projectId} />;
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-2 gap-4 p-4 w-full">
      <div className="flex flex-col justify-center items-center">
        <NewBoard userId={userId || ""} projectId={projectId || ""}>
          <Button
            variant="outline"
            size="icon"
            className={`rounded-full shadow hover:shadow-lg transition cursor-pointer w-16 h-16 ${
              optimisticBoards.length > 0 ? "cursor-not-allowed opacity-50" : ""
            }`}
            disabled={optimisticBoards.length > 0}
          >
            {optimisticBoards.length > 0 ? (
              <Loader2 className="w-6 h-6 text-gray-500 animate-spin absolute" />
            ) : (
              <PlusIcon className="w-16 h-16 text-black" />
            )}
          </Button>
        </NewBoard>
        <p className="mt-2 text-sm font-medium text-gray-600">
          {optimisticBoards.length > 0 ? "Creating..." : "New board"}
        </p>
      </div>
      {optimisticBoardsList.map((board: BoardDtoType) => (
        <BoardItem
          key={board.id}
          board={board}
          userId={userId || ""}
          isOptimistic={true}
          updateFavoriteBoards={updateFavoriteBoards}
        />
      ))}
      {realBoards?.map((board: BoardDtoType) => (
        <BoardItem
          key={board.id}
          board={board}
          userId={userId || ""}
          updateFavoriteBoards={updateFavoriteBoards}
        />
      ))}
    </div>
  );
};

export default BoardsList;
