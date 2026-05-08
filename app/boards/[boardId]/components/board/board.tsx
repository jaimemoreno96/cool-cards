"use client";

import { useMemo, useState } from "react";
import { DragDropProvider } from "@dnd-kit/react";
import { move } from "@dnd-kit/helpers";

import BoardColumn from "./board-column";
import AddColumnButton from "./add-column-button";

import { BoardColumnDtoType, CardDtoType } from "@/app/boards/types/boards";
import { BOARDS_ENUM } from "@/app/boards/enum";
import AddColumnForm from "./add-column-form";
import { useBoard } from "@/app/boards/hooks/use-board";

interface BoardProps {
  userId: string;
  boardId: string;
}
const Board = ({ userId, boardId }: BoardProps) => {
  const [creatingNewColumn, setCreatingNewColumn] = useState<boolean>(false);
  const { board, boardError, boardIsLoading } = useBoard(boardId);
  console.log("Board:", board);
  
  const [columns, setColumns] = useState<BoardColumnDtoType[]>([
    {
      id: "column-1",
      name: "Column 1",
      position: BOARDS_ENUM.DEFAULT_POSITION,
      boardId: "board-1",
      cards: [
        {
          id: "1",
          name: "Card 1",
          description: "Description for Card 1",
          boardColumnId: "column-1",
          boardId: "board-1",
          userId: "user-1",
          position: BOARDS_ENUM.DEFAULT_POSITION,
        },
        {
          id: "2",
          name: "Card 2",
          description: "Description for Card 2",
          boardColumnId: "column-1",
          boardId: "board-1",
          userId: "user-1",
          position: BOARDS_ENUM.DEFAULT_POSITION * 2,
        },
      ],
    },
    {
      id: "column-2",
      name: "Column 2",
      position: BOARDS_ENUM.DEFAULT_POSITION * 2,
      boardId: "board-1",
      cards: [
        {
          id: "3",
          name: "Card 3",
          description: "Description for Card 3",
          boardColumnId: "column-2",
          boardId: "board-1",
          userId: "user-1",
          position: BOARDS_ENUM.DEFAULT_POSITION,
        },
        {
          id: "4",
          name: "Card 4",
          description: "Description for Card 4",
          boardColumnId: "column-2",
          boardId: "board-1",
          userId: "user-1",
          position: BOARDS_ENUM.DEFAULT_POSITION * 2,
        },
      ],
    },
    {
      id: "column-3",
      name: "Column 3",
      position: BOARDS_ENUM.DEFAULT_POSITION * 3,
      boardId: "board-1",
      cards: [
        {
          id: "5",
          name: "Card 5",
          description: "Description for Card 5",
          boardColumnId: "column-3",
          boardId: "board-1",
          userId: "user-1",
          position: BOARDS_ENUM.DEFAULT_POSITION,
        },
        {
          id: "6",
          name: "Card 6",
          description: "Description for Card 6",
          boardColumnId: "column-3",
          boardId: "board-1",
          userId: "user-1",
          position: BOARDS_ENUM.DEFAULT_POSITION * 2,
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

  const cardsByColumn = useMemo(
    () =>
      columns.reduce<Record<string, CardDtoType[]>>((acc, col) => {
        acc[col.id] = col.cards || [];
        return acc;
      }, {}),
    [columns]
  );

  const calculatePosition = (prev?: number, next?: number): number => {
    if (!prev && !next) return BOARDS_ENUM.DEFAULT_POSITION;
    if (!prev) return next! / 2;
    if (!next) return prev + BOARDS_ENUM.DEFAULT_POSITION;
    return (prev + next) / 2;
  };

  return (
    <div className="h-full w-full">
      <ol className="flex gap-4 h-full overflow-x-auto px-4">
        <DragDropProvider
          onDragStart={() => {}}
          onDragOver={(event) => {
            const { source, target } = event.operation;

            if (source?.data?.id !== target?.data?.id) {
              console.log("---------------- Drag over events ----------------");

              console.log("Operation source:", source?.data);
              console.log("Operation target:", target?.data);
            }
          }}
          onDragEnd={(event) => {
            const { source, target } = event.operation;

            console.log(source?.id, target?.id );
            

            console.log(
              "Source and target:",
              source?.data?.id,
              target?.data?.id
            );
            return;

            if (source?.type === "column") {
              if (target?.type === "column") {
                setColumnOrder((columns) => {
                  const newOrder = move(columns, event);
                  const columnIndexAfterMove = newOrder.findIndex(
                    (col) => col.id === source?.id
                  );

                  const prevCol = newOrder[columnIndexAfterMove - 1];
                  const nextCol = newOrder[columnIndexAfterMove + 1];
                  const newPosition = calculatePosition(
                    prevCol?.position,
                    nextCol?.position
                  );

                  return newOrder.map((col) =>
                    col.id === source?.id
                      ? { ...col, position: newPosition }
                      : col
                  );
                });
              }
              return;
            }

            if (source?.type === "card") {
              if (target?.type === "card") {
                setCards((cards) => {
                  const newOrder = move(cards, event);
                  const columnId = Object.keys(newOrder).find((key) =>
                    newOrder[key].some((card) => card.id === source?.id)
                  );

                  if (!columnId) return cards;

                  const cardIndexAfterMove = newOrder[columnId].findIndex(
                    (card) => card.id === source?.id
                  );

                  const prevCard = newOrder[columnId][cardIndexAfterMove - 1];
                  const nextCard = newOrder[columnId][cardIndexAfterMove + 1];
                  const newPosition = calculatePosition(
                    prevCard?.position,
                    nextCard?.position
                  );

                  return {
                    ...newOrder,
                    [columnId]: newOrder[columnId].map((card) =>
                      card.id === source?.id
                        ? { ...card, position: newPosition }
                        : card
                    ),
                  };
                });
              }
              return;
            }
          }}
        >
          {board.boardColumns?.map((column, index) => (
            <BoardColumn key={index} index={index} column={column} />
          ))}
        </DragDropProvider>
        <li className="flex flex-col align-center shrink-0 w-72 min-w-72 h-fit">
          {creatingNewColumn ? (
            <AddColumnForm
              userId={userId}
              boardId={boardId}
              lastpostion={columnOrder[columnOrder.length - 1].position + BOARDS_ENUM.DEFAULT_POSITION}
              onClick={() => setCreatingNewColumn(false)}
            />
          ) : (
            <AddColumnButton userId={userId} onClick={() => setCreatingNewColumn(true)} />
          )}
        </li>
      </ol>
    </div>
  );
};

export default Board;
