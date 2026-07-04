"use client";

import { memo, useMemo, useRef, useState } from "react";
import {
  DragDropProvider,
  KeyboardSensor,
  PointerSensor,
} from "@dnd-kit/react";
import { move } from "@dnd-kit/helpers";

import BoardColumn from "./board-column";
import ColumnPlaceholder from "./column-placeholder";
import AddColumnButton from "./add-column-button";
import AddColumnForm from "./add-column-form";

import boardService from "@/app/boards/services/board-service";
import { useBoard } from "@/app/boards/hooks/use-board";

import { BoardColumnDtoType, CardDtoType } from "@/app/boards/types/boards";
import { BOARDS_ENUM } from "@/app/boards/enum";
import { Feedback } from "@dnd-kit/dom";

interface BoardProps {
  userId: string;
  boardId: string;
}
const Board = memo(({ userId, boardId }: BoardProps) => {
  const [creatingNewColumn, setCreatingNewColumn] = useState<boolean>(false);
  const { board, updateBoardColumn, boardError, boardIsLoading, mutateBoard } =
    useBoard(boardId);
  const snapshotRef = useRef<BoardColumnDtoType[] | undefined>(undefined);
  console.log("Board:", board);

  const sensors = [
    PointerSensor.configure({
      activatorElements(source) {
        return [source.element, source.handle];
      },
    }),
    KeyboardSensor,
  ];

  const boardColumns = useMemo(
    () =>
      board?.boardColumns?.map((boardColum) => ({
        id: boardColum.id,
        name: boardColum.name,
        position: boardColum.position,
        boardId: boardColum.boardId,
      })),
    [board?.boardColumns]
  );

  const cardsByColumn = useMemo(
    () =>
      (board?.boardColumns || []).reduce<Record<string, CardDtoType[]>>(
        (acc, col) => {
          acc[col.id] = col.cards || [];
          return acc;
        },
        {}
      ),
    [board?.boardColumns]
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
          sensors={sensors}
          onDragStart={() => {
            snapshotRef.current = board.boardColumns?.map((col) => ({
              ...col,
              cards: col.cards?.map((card) => ({ ...card })),
            }));
          }}
          onDragOver={(event) => {
            const { source } = event.operation;

            if (source?.type === "column") return;

            mutateBoard((currentData) => {
              if (!currentData?.boardColumns) return currentData;

              const cardsByColumn = currentData.boardColumns.reduce<
                Record<string, CardDtoType[]>
              >((acc, col) => {
                acc[col.id] = col.cards || [];
                return acc;
              }, {});

              const reordered = move(cardsByColumn, event);

              return {
                ...currentData,
                boardColumns: currentData.boardColumns.map((col) => ({
                  ...col,
                  cards: reordered[col.id] || [],
                })),
              };
            }, false);
          }}
          onDragEnd={async (event) => {
            const { source, target } = event.operation;

            if (event.canceled) {
              if (snapshotRef.current) {
                mutateBoard((currentData) => {
                  if (!currentData) return currentData;
                  return {
                    ...currentData,
                    boardColumns: snapshotRef.current!,
                  };
                }, false);
              }
              return;
            }

            console.log(source?.id, target?.id);

            console.log(
              "Source and target:",
              source?.data?.id,
              target?.data?.id
            );

            if (source?.type === "column") {
              const prevOrder = boardColumns || [];
              const newOrder = move(prevOrder, event);

              if (newOrder !== prevOrder) {
                const columnIndexAfterMove = newOrder.findIndex(
                  (col) => col.id === source?.id
                );

                if (columnIndexAfterMove !== -1) {
                  const prevCol = newOrder[columnIndexAfterMove - 1];
                  const nextCol = newOrder[columnIndexAfterMove + 1];
                  const newPosition = calculatePosition(
                    prevCol?.position,
                    nextCol?.position
                  );

                  const boardColumnId = source?.data?.id;
                  const newBoardColumnName =
                    newOrder[columnIndexAfterMove].name;

                  try {
                    const response = await updateBoardColumn(
                      userId,
                      boardColumnId,
                      newBoardColumnName,
                      newPosition
                    );
                    console.log("Move Column Response:", response);
                    if (response?.status !== 200)
                      throw new Error("Failed to move board column");
                  } catch (err) {
                    throw err;
                  }
                }
              }
              return;
            }

            if (source?.type === "card") {
              if (target?.type === "card") {
                const newOrder = move(cardsByColumn, event);
                const columnId = Object.keys(newOrder).find((key) =>
                  newOrder[key].some((card) => card.id === source?.id)
                );

                if (!columnId) return cardsByColumn;

                const cardIndexAfterMove = newOrder[columnId].findIndex(
                  (card) => card.id === source?.id
                );

                const prevCard = newOrder[columnId][cardIndexAfterMove - 1];
                const nextCard = newOrder[columnId][cardIndexAfterMove + 1];
                const newPosition = calculatePosition(
                  prevCard?.position,
                  nextCard?.position
                );

                const cardId = source?.data?.id;
                const newCardName = newOrder[columnId][cardIndexAfterMove].name;
                const newCardDescription =
                  newOrder[columnId][cardIndexAfterMove].description;

                console.log("Params:", {
                  userId,
                  cardId,
                  newCardName,
                  newPosition,
                });

                try {
                  const response = await boardService.updateCard(
                    userId,
                    cardId,
                    columnId,
                    newCardName,
                    newCardDescription,
                    newPosition
                  );
                  console.log("Move Card Response:", response);
                  if (response?.status !== 200)
                    throw new Error("Failed to move board card");
                } catch (err) {
                  throw err;
                }
              }
              return;
            }
          }}
        >
          {board.boardColumns?.map((column, index) => (
            <BoardColumn
              key={column.id}
              index={index}
              column={column}
              boardId={boardId}
              userId={userId}
            />
          ))}
          <ColumnPlaceholder>
            {creatingNewColumn ? (
              <AddColumnForm
                userId={userId}
                boardId={boardId}
                lastpostion={
                  board.boardColumns?.length
                    ? board.boardColumns[board.boardColumns.length - 1]
                        .position + BOARDS_ENUM.DEFAULT_POSITION
                    : BOARDS_ENUM.DEFAULT_POSITION
                }
                onClick={() => setCreatingNewColumn(false)}
              />
            ) : (
              <AddColumnButton
                userId={userId}
                onClick={() => setCreatingNewColumn(true)}
              />
            )}
          </ColumnPlaceholder>
        </DragDropProvider>
      </ol>
    </div>
  );
});

export default Board;
