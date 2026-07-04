"use client";

import { useSortable } from "@dnd-kit/react/sortable";

import CardItem from "./card-item";
import AddCardButton from "./add-card-button";
import BoardColumnHeader from "./board-column-header";

import { BoardColumnDtoType } from "@/app/boards/types/boards";
import { BOARDS_ENUM } from "@/app/boards/enum";
import { memo, useState } from "react";
import AddCardForm from "./add-card-form";
import { CollisionPriority } from "@dnd-kit/abstract";
import { Feedback } from "@dnd-kit/dom";

interface BoardColumnProps {
  index: number;
  column: BoardColumnDtoType;
  boardId: string;
  userId: string;
}

const BoardColumn = memo(
  ({ index, column, boardId, userId }: BoardColumnProps) => {
    console.log("Column:", column);

    const [creatingNewCard, setCreatingNewCard] = useState(false);
    const { ref, sourceRef, targetRef, handleRef } = useSortable({
      id: column.id,
      index,
      plugins: [Feedback.configure({ feedback: "clone" })],
      accept: ["column", "card"],
      // group: column.boardId,
      collisionPriority: CollisionPriority.Low,
      type: "column",
      data: { ...column },
    });

    return (
      <li
        ref={ref}
        className="flex flex-col align-center gap-2 bg-gray-100 shrink-0 w-72 min-w-72 h-fit max-h-4/5 rounded-md"
      >
        <BoardColumnHeader
          handlerRef={handleRef}
          index={index}
          name={column.name}
        />
        <ol
          ref={targetRef}
          id={column.id}
          className="flex flex-col gap-4 w-full h-full overflow-y-auto overflow-x-hidden"
          style={{ "--columns": 1 } as React.CSSProperties}
        >
          {column.cards?.map((card, index) => (
            <CardItem key={card.id} index={index} card={card} />
          ))}
          <li>
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
        </ol>
      </li>
    );
  }
);

export default BoardColumn;
