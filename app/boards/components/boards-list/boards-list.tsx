"use client";

import React from "react";
import { useBoards } from "../../hooks/useBoards";
import { BoardDtoType } from "../../types/boards";
import EmptyBoardsList from "./empty-boards-list";

interface BoardsListProps {
  userId?: string;
  projectId?: string;
}
const BoardsList = ({ userId, projectId }: BoardsListProps) => {
  const { boards } = useBoards(userId, projectId);

  console.log("Boards:", boards);
  

  return (
    <>
      {boards?.length === 0 ? (
        <EmptyBoardsList />
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-4 p-4 w-full">
          {boards?.map((board: BoardDtoType) => (
            <p key={board.id}>{board.name}</p>
          ))}
        </div>
      )}
    </>
  );
};

export default BoardsList;
