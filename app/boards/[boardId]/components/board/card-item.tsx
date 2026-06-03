"use client";

import { CardDtoType } from "@/app/boards/types/boards";
import { useSortable } from "@dnd-kit/react/sortable";
interface CardItemProps {
  index: number;
  card: CardDtoType;
}
const CardItem = ({ card, index }: CardItemProps) => {

  const { ref, isDragging } = useSortable({
    id: card.id,
    index,
    type: "card",
    group: card.boardColumnId,
    accept: "card",
    data: { ...card, boardColumnId: card.boardColumnId },
  });
  return (
    <li
      ref={ref}
      data-dragging={isDragging}
      className="bg-white rounded-md mx-2 p-2 shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-200"
    >
      <h4 className="text-sm font-medium text-gray-900">{card.name}</h4>
    </li>
  );
};

export default CardItem;
