"use client";

import { useMemo, useRef, useState } from "react";
import { DragDropProvider } from "@dnd-kit/react";
import { move } from "@dnd-kit/helpers";

import BoardColumn from "./board-column";
import AddColumnButton from "./add-column-button";

import { BoardColumnDtoType, CardDtoType } from "@/app/boards/types/boards";

const Board = () => {
  const [columns, setColumns] = useState<BoardColumnDtoType[]>([
    {
      id: "column-1",
      name: "Column 1",
      position: 1650.123,
      boardId: "board-1",
      cards: [
        {
          id: "1",
          name: "Card 1",
          description: "Description for Card 1",
          boardColumnId: "column-1",
          boardId: "board-1",
          userId: "user-1",
          position: 1650.123,
        },
        {
          id: "2",
          name: "Card 2",
          description: "Description for Card 2",
          boardColumnId: "column-1",
          boardId: "board-1",
          userId: "user-1",
          position: 3300.456,
        },
      ],
    },
    {
      id: "column-2",
      name: "Column 2",
      position: 3300.456,
      boardId: "board-1",
      cards: [
        {
          id: "3",
          name: "Card 3",
          description: "Description for Card 3",
          boardColumnId: "column-2",
          boardId: "board-1",
          userId: "user-1",
          position: 1650.123,
        },
        {
          id: "4",
          name: "Card 4",
          description: "Description for Card 4",
          boardColumnId: "column-2",
          boardId: "board-1",
          userId: "user-1",
          position: 3300.456,
        },
      ],
    },
    {
      id: "column-3",
      name: "Column 3",
      position: 4950.789,
      boardId: "board-1",
      cards: [
        {
          id: "5",
          name: "Card 5",
          description: "Description for Card 5",
          boardColumnId: "column-3",
          boardId: "board-1",
          userId: "user-1",
          position: 1650.123,
        },
        {
          id: "6",
          name: "Card 6",
          description: "Description for Card 6",
          boardColumnId: "column-3",
          boardId: "board-1",
          userId: "user-1",
          position: 3300.456,
        },
      ],
    },
  ]);

  const [columnOrder, setColumnOrder] = useState(() =>
    columns.map((col) => ({
      id: col.id,
      name: col.name,
      position: col.position,
      boardId: col.boardId,
    }))
  );

  const [cards, setCards] = useState<Record<string, CardDtoType[]>>(() =>
    columns.reduce<Record<string, CardDtoType[]>>((acc, col) => {
      acc[col.id] = col.cards || [];
      return acc;
    }, {})
  );

  const previousCards = useRef<Record<string, CardDtoType[]>>({});

  const cardsByColumn = useMemo(
    () =>
      columns.reduce<Record<string, CardDtoType[]>>((acc, col) => {
        acc[col.id] = col.cards || [];
        return acc;
      }, {}),
    [columns]
  );

  return (
    <div className="h-full w-full">
      <ol className="flex gap-4 h-full overflow-x-auto px-4">
        <DragDropProvider
          onDragStart={() => {
            previousCards.current = cardsByColumn;
          }}
          onDragEnd={(event) => {
            if (event.canceled) {
              // Restore previous state on cancel
              setColumns((prev) =>
                prev.map((col) => ({
                  ...col,
                  cards: previousCards.current[col.id] || [],
                }))
              );
            }
            const { source, target } = event.operation;
            if (source?.type === "column") {
              setColumnOrder((columns) => {
                const newOrder = move(columns, event);
                console.log("New column order:", newOrder);
                const columnIndexAfterMove = newOrder.findIndex(
                  (col) => col.id === source.id
                );
                const lastIndex = newOrder.length - 1;

                if (columnIndexAfterMove !== -1) {
                  if (columnIndexAfterMove === lastIndex) {
                    console.log("Moved to the end of the list");
                    const nextColumn = newOrder[columnIndexAfterMove + 1];
                  }

                  if (columnIndexAfterMove === 0) {
                    console.log("Moved to the beginning of the list");
                    const previousColumn = newOrder[columnIndexAfterMove - 1];
                  }

                  const previousColumn = newOrder[columnIndexAfterMove - 1];
                  const nextColumn = newOrder[columnIndexAfterMove + 1];
                }

                return newOrder;
              });
            }

            if (source?.type === "card") {
              setCards((cards) => {
                const newOrder = move(cards, event);
                console.log("New cards order:", newOrder);

                console.log("Source card ID:", target?.id);

                const columId = Object.keys(newOrder).find((key) =>
                  newOrder[key].some((card) => card.id === source.id)
                );
                console.log("Column ID after move:", columId);

                const cardIndexAfterMove = newOrder[columId || ""].findIndex(
                  (card) => card.id === source.id
                );

                console.log("Card index after move:", cardIndexAfterMove);

                const lastIndex = newOrder[target?.id || ""]?.length - 1;
                if (cardIndexAfterMove !== -1) {
                  if (cardIndexAfterMove === lastIndex) {
                    console.log("Moved to the end of the list");
                    const nextCard =
                      newOrder[target?.id || ""]?.[cardIndexAfterMove + 1];
                  }

                  if (cardIndexAfterMove === 0) {
                    console.log("Moved to the beginning of the list");
                    const previousCard =
                      newOrder[target?.id || ""]?.[cardIndexAfterMove - 1];
                  }

                  const previousCard =
                    newOrder[target?.id || ""]?.[cardIndexAfterMove - 1];
                  const nextCard =
                    newOrder[target?.id || ""]?.[cardIndexAfterMove + 1];
                }
                return newOrder;
              });
            }
          }}
        >
          {columns.map((column, index) => (
            <BoardColumn key={index} index={index} column={column} />
          ))}
        </DragDropProvider>
        <li className="flex flex-col align-center shrink-0 w-72 min-w-72 h-fit">
          <AddColumnButton />
        </li>
      </ol>
    </div>
  );
};

export default Board;
