"use client";

import { useSortable } from "@dnd-kit/react/sortable";
import { CollisionPriority } from "@dnd-kit/abstract";

import CardItem from "./card-item";
import AddCardButton from "./add-card-button";
import BoardColumnHeader from "./board-column-header";

import { BoardColumnDtoType, CardDtoType } from "@/app/boards/types/boards";

interface BoardColumnProps {
  index: number;
  column: BoardColumnDtoType;
}

const BoardColumn = ({ index, column }: BoardColumnProps) => {
  const { ref } = useSortable({
    id: column.id,
    index,
    type: "column",
    collisionPriority: CollisionPriority.Low,
    accept: ["card", "column"],
    data: { ...column },
  });

  return (
    <li
      ref={ref}
      className="flex flex-col align-center gap-2 bg-gray-100 shrink-0 w-72 min-w-72 h-fit max-h-4/5 rounded-md"
    >
      <BoardColumnHeader index={index} />
      <ol className="flex flex-col gap-4 w-full h-full overflow-y-auto">
        {column.cards?.map((card, index) => (
          <CardItem key={index} index={index} card={card} />
        ))}
      </ol>
      <AddCardButton />
    </li>
  );
};

export default BoardColumn;
