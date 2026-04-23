"use client";

import { useBoards } from "../../hooks/use-boards";
import BoardItem from "../boards-list/board-item";
import EmptyBoardsList from "../boards-list/empty-boards-list";
import BoardsListSkeleton from "../ui/boards-list-skeleton";

interface FavoriteBoardsListProps {
  userId?: string;
  projectId?: string;
}
const FavoriteBoardsList = ({ userId, projectId }: FavoriteBoardsListProps) => {
  const { favoriteBoards, boardsError, boardsIsLoading, updateFavoriteBoards } =
    useBoards(userId, projectId);

  if (boardsError) return <div>Failed to load boards</div>;
  if (boardsIsLoading) return <BoardsListSkeleton />;
  return (
    <>
      {favoriteBoards?.length === 0 ? (
        <EmptyBoardsList userId={userId} projectId={projectId} />
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-2 gap-4 p-4 w-full">
          {favoriteBoards?.map((board) => (
            <BoardItem
              key={board.id}
              board={board}
              userId={userId || ""}
              updateFavoriteBoards={updateFavoriteBoards}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default FavoriteBoardsList;
