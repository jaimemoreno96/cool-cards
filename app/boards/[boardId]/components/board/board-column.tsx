"use client";

import { useSortable } from "@dnd-kit/react/sortable";

import CardItem from "./card-item";
import AddCardButton from "./add-card-button";
import BoardColumnHeader from "./board-column-header";

import { BoardColumnDtoType } from "@/app/boards/types/boards";
import { BOARDS_ENUM } from "@/app/boards/enum";
import { useState } from "react";
import AddCardForm from "./add-card-form";

interface BoardColumnProps {
  index: number;
  column: BoardColumnDtoType;
  boardId: string;
  userId: string;
}

const BoardColumn = ({ index, column, boardId, userId }: BoardColumnProps) => {
  console.log("Column:", column);

  const [creatingNewCard, setCreatingNewCard] = useState(false);
  const { ref, targetRef, handleRef } = useSortable({
    id: column.id,
    index,
    type: "column",
    group: "board-columns",
    accept: ["card", "column"],
    data: { ...column },
  });

  return (
    <li 
      ref={ref}
      className="flex flex-col align-center gap-2 bg-gray-100 shrink-0 w-72 min-w-72 h-fit max-h-4/5 rounded-md"
    >
      <BoardColumnHeader handlerRef={handleRef} index={index} name={column.name} />
      <ol ref={targetRef} className="flex flex-col gap-4 w-full h-full overflow-y-auto">
        {column.cards?.map((card, index) => (
          <CardItem key={index} index={index} card={card} />
        ))}
      </ol>
      {creatingNewCard ? (
        <AddCardForm
          userId={userId}
          boardId={boardId}
          boardColumnId={column.id}
          lastpostion={
            column.cards?.length
              ? column.cards[column.cards.length - 1].position +
                BOARDS_ENUM.DEFAULT_POSITION
              : BOARDS_ENUM.DEFAULT_POSITION
          }
          onClick={() => setCreatingNewCard(false)}
        />
      ) : (
        <AddCardButton
          onClick={() => setCreatingNewCard(true)}
          userId={userId}
        />
      )}
    </li>
  );
};

export default BoardColumn;
