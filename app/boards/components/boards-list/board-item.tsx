import React from "react";
import { BoardDtoType } from "../../types/boards";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import FavoriteButton from "@/app/projects/components/projects-list/favorite-button";
import Link from "next/link";
import { UserDtoType } from "../../types/users";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Member from "../../[boardId]/components/board-info/member";

interface BoardItemProps {
  board: BoardDtoType;
  userId: string;
  isOptimistic?: boolean;
  updateFavoriteBoards: (
    boardId: string,
    userId: string,
    isFavorite: boolean
  ) => Promise<void>;
}
const BoardItem = ({
  board,
  userId,
  isOptimistic,
  updateFavoriteBoards,
}: BoardItemProps) => {
  const handleFavoriteOnClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Board ID:", board.id);

    if (isOptimistic) return;
    await updateFavoriteBoards(board.id, userId, !board.favorite);
  };
  return (
    <AspectRatio
      ratio={16 / 9}
      className={`group relative border rounded-md shadow hover:shadow-lg transition cursor-pointer h-auto bg-white ${
        isOptimistic ? "opacity-60 pointer-events-none" : "hover:shadow-lg"
      }`}
    >
      {!isOptimistic && (
        <Link
          href={`/boards/${board.id}`}
          className="absolute inset-0 z-10"
          aria-label={`View project: ${board.name}`}
        />
      )}

      <div className="flex flex-col justify-between">
        <Image
          src={board.imageUrl || ""}
          alt={board.name}
          fill
          className="w-full h-auto aspect-video object-cover rounded-md"
          unoptimized
        />
      </div>
      <div className="absolute bottom-0 flex justify-between items-center w-full p-2 bg-black/80 opacity-80 rounded-b-md">
        <h3 className="relative z-10 text-lg font-semibold text-white truncate pointer-events-none">
          {board.name}
        </h3>
        {board.membersData && board.membersData.length > 0 && (
          <div className="relative overflow-hidden flex -space-x-2 w-fit rounded-lg">
            {board.membersData.slice(0, 3).map((member: UserDtoType) => (
              <Member key={member.id} member={member} />
            ))}
          </div>
        )}
      </div>
      <div className="absolute top-2 right-2 z-10">
        <FavoriteButton
          isFavorite={board.favorite}
          handleFavoriteOnClick={handleFavoriteOnClick}
          disabled={isOptimistic}
        />
      </div>
    </AspectRatio>
  );
};

export default BoardItem;
