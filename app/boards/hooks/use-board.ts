import axios, { AxiosResponse } from "axios";
import useSWR from "swr";

import { BoardResponse } from "../types/boards";
import { Board } from "../lib/definitions";
import { updateBoard } from "../data/board";

import { useBoardsStore } from "@/app/store/boards";

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
  const members = data?.members;

  const updateSelectedBoard = async (
    userId: string,
    boardId: string,
    data: Board
  ) => {
    try {
      const response = await updateBoard(boardId || "", data);
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

  return {
    board: {
      board,
      members,
    },
    updateSelectedBoard,
    boardError: error,
    boardIsLoading: isLoading,
    mutateBoard: mutate,
  };
};
