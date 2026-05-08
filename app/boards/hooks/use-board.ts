import axios, { AxiosResponse } from "axios";
import useSWR from "swr";

import { BoardResponse } from "../types/boards";
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

  const moveBoardColumn = async (
    userId: string,
    boardId: string,
    boardColumnId: string,
    position: number
  ) => {
    try {
      const response = await boardService.updateBoardColumn(
        userId,
        boardId,
        boardColumnId,
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

  return {
    board: {
      board,
      members,
      boardColumns,
    },
    addBoardColumn,
    updateSelectedBoard,
    moveBoardColumn,
    boardError: error,
    boardIsLoading: isLoading,
    mutateBoard: mutate,
  };
};
