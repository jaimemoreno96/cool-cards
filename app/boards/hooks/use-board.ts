import axios, { AxiosResponse } from "axios";
import useSWR from "swr";

import { BoardColumnDtoType, BoardResponse } from "../types/boards";
import { Board } from "../lib/definitions";
import boardService from "../services/board-service";

import { useBoardsStore } from "@/app/store/boards";
import { create } from "domain";

const fetcher = (url: string) =>
  axios(url).then((res: AxiosResponse<BoardResponse, any>) => res.data);

export const useBoard = (boardId: string) => {
  const {} = useBoardsStore();

  const { data, error, isLoading, mutate } = useSWR(
    `/api/boards/board/${boardId}`,
    fetcher,
    {
      revalidateOnFocus: true,
      shouldRetryOnError: false,
    }
  );

  const board = data?.board;
  const boardColumns = data?.boardColumns;
  const members = data?.members;

  const updateSelectedBoard = async (
    userId: string,
    boardId: string,
    data: Board
  ) => {
    try {
      const response = await boardService.updateBoard(boardId || "", data);
      if (response.status !== 200) throw new Error("Failed to update board");
      const updatedBoard = response?.data?.board;
      const updatedMembers = response?.data?.members;

      await mutate();

      return { board: updatedBoard, members: updatedMembers };
    } catch (error) {
      await mutate();
      throw error;
    }
  };

  const addBoardColumn = async (
    userId: string,
    boardId: string,
    columnName: string,
    position: number
  ) => {
    try {
      const response = await boardService.createBoardColumn(
        userId,
        boardId,
        columnName,
        position
      );
      console.log("Response:", response);

      if (response.status !== 200)
        throw new Error("Failed to add board column");
      await mutate();
      return response;
    } catch (error) {
      await mutate();
      throw error;
    }
  };

  const updateBoardColumn = async (
    userId: string,
    boardColumnId: string,
    boardColumnName: string,
    position: number
  ) => {
    try {
      const response = await boardService.updateBoardColumn(
        userId,
        boardColumnId,
        boardColumnName,
        position
      );
      console.log("Move Column Response:", response);
      if (response.status !== 200)
        throw new Error("Failed to move board column");
      await mutate();
      return response;
    } catch (err) {
      await mutate();
    }
  };

  const addCard = async (
    userId: string,
    boardId: string,
    boardColumnId: string,
    cardName: string,
    position: number
  ) => {
    // Optimistic update
    mutate(
      (board: any) => ({
        ...board,
        boardColumns: (boardColumns || []).map((column: BoardColumnDtoType) => {
          if (column.id === boardColumnId) {
            return {
              ...column,
              cards: [
                ...(column.cards || []),
                {
                  id: "temp-id",
                  userId,
                  boardId: board.id,
                  boardColumnId,
                  name: cardName,
                  position,
                },
              ],
            };
          }
          return column;
        }),
      }),
      false
    );
    try {
      const response = await boardService.createCard(
        userId,
        boardId,
        boardColumnId,
        cardName,
        position
      );
      if (response.status !== 200) throw new Error("Failed to add card");
      await mutate();
      return response;
    } catch (error) {
      await mutate();
      throw error;
    }
  };

  return {
    board: {
      board,
      members,
      boardColumns,
    },
    addBoardColumn,
    addCard,
    updateSelectedBoard,
    updateBoardColumn,
    boardError: error,
    boardIsLoading: isLoading,
    mutateBoard: mutate,
  };
};
