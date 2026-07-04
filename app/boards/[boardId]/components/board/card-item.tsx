"use client";

import { Feedback } from "@dnd-kit/dom";

import { CardDtoType } from "@/app/boards/types/boards";
import { useSortable } from "@dnd-kit/react/sortable";
import { memo } from "react";
interface CardItemProps {
  index: number;
  card: CardDtoType;
}
const CardItem = memo(({ card, index }: CardItemProps) => {
  const { ref, handleRef, isDragging } = useSortable({
    id: card.id,
    index,
    plugins: [Feedback.configure({feedback: 'clone'})],
    type: "card",
    group: card.boardColumnId,
    accept: "card",
    data: { ...card, boardColumnId: card.boardColumnId },
  });
  return (
    <li
      ref={ref}
      data-dragging={isDragging || undefined}
      className={`bg-white rounded-md mx-2 p-2 shadow-sm hover:shadow-md cursor-grab transition-[transform,box-shadow] duration-300 ease-in-out border border-gray-200 data-dnd-placeholder:opacity-50 data-dnd-placeholder:shadow-none ${isDragging ? 'scale-105 shadow-lg z-10': ''}`}
    >
      <div className="flex items-center justify-between gap-2">
        <h4 className="text-sm font-medium text-gray-900">{card.name}</h4>
        {/* <button
          ref={handleRef}
          className="touch-none cursor-grab rounded p-1.5 hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          aria-label="Drag handle"
        >
          <svg viewBox="0 0 20 20" className="w-3 h-3 fill-gray-400 hover:fill-gray-600">
            <path d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z" />
          </svg>
        </button> */}
      </div>
    </li>
  );
});

export default CardItem;
