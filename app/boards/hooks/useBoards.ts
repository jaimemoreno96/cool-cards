import axios from "axios";
import useSWR from "swr";

import { useBoardsStore } from "@/app/store/boards";

import { BoardsResponse } from "../types/boards";

const fetcher = (url: string) => axios(url).then((res) => res.data);

export const useBoards = (userId?: string, projectId?: string) => {
  const { boards, setBoards, favoriteBoards, setFavoriteBoards, setError } =
    useBoardsStore();

  const { data, error, isLoading, mutate } = useSWR(
    userId
      ? `/api/boards/${userId}`
      : projectId
      ? `/api/boards/${projectId}`
      : null,
    fetcher,
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
      onSuccess(data: BoardsResponse) {
        console.log("Data:", data);
        setBoards(data.boards);
        setFavoriteBoards(data.boards);
      },
      onError(err, key, config) {
        console.log(err);
        setError(err.message);
      },
    }
  );

  return {
    boards: data?.boards || boards,
    boardsError: error,
    boardsIsLoading: isLoading,
    mutateBoards: mutate,
  };
};
