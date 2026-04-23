import axios, { AxiosResponse } from "axios";
import useSWR from "swr";

import { useBoardsStore } from "@/app/store/boards";
import { Board } from "../lib/definitions";
import { BoardDtoType, BoardImage, NewBoardResponse } from "../types/boards";

import { BoardsResponse } from "../types/boards";
import { createBoard, fetchImages, setFavoriteBoard } from "../data/board";
import { mergeOptimisticUpdates } from "@/app/lib/merge-optimistic-updates";

const fetcher = (url: string) =>
  axios(url).then((res: AxiosResponse<BoardsResponse, any>) => res.data);

export const useBoards = (userId?: string, projectId?: string) => {
  const {
    selectableBoardImages,
    optimisticBoards,
    setSelectableBoardImages,
    setOptimisticBoards,
    clearOptimisticBoards,
    setError,
  } = useBoardsStore();

  const { data, error, isLoading, mutate } = useSWR(
    userId ? `/api/boards/${userId}` : `/api/boards/${projectId}`,
    fetcher,
    {
      revalidateOnFocus: true,
      shouldRetryOnError: false,
    }
  );

  const boards = data?.boards ?? [];
  const displayBoards =
    optimisticBoards.length > 0
      ? mergeOptimisticUpdates(boards, optimisticBoards)
      : boards;

  const favoriteBoards = displayBoards.filter((b) => b.favorite);

  const updateFavoriteBoards = async (
    boardId: string,
    userId: string,
    isFavorite: boolean
  ) => {
    try {
      const response = await setFavoriteBoard(boardId, userId, isFavorite);
      if (response.status !== 200) {
        throw new Error("Failed to update");
      }

      await mutate();
    } catch (error) {
      await mutate();
    }
  };

  const addNewBoard = async (
    userId: string,
    boardData: Board,
    boardImage: BoardImage | null
  ) => {
    const optimisticBoard: BoardDtoType = {
      id: `temp-${Date.now()}`,
      name: boardData.name,
      description: boardData.description,
      projectId: boardData.projectId || "",
      userId: userId,
      favorite: false,
      members: boardData.members,
      imageName: boardImage?.name || "default-image.png",
      imageUrl: boardImage?.url || "default-image.png",
    };

    setOptimisticBoards(optimisticBoard);

    try {
      const response = await createBoard(
        userId,
        projectId || "",
        boardData,
        boardImage || null
      );
      if (response.status !== 200) throw new Error("Failed to create board");
      const newBoard = response.data.board;
      clearOptimisticBoards();
      await mutate();

      return newBoard;
    } catch (error) {
      clearOptimisticBoards();
      await mutate();
      throw error;
    }
  };

  const getImages = async () => {
    try {
      const images = await fetchImages();
      if (images) {
        console.log("Fetched images:", images);
        setSelectableBoardImages(images);
      }
    } catch (error) {
      console.error("Error fetching images:", error);
      throw new Error("Failed to fetch images", error as Error);
    }
  };

  return {
    boards: displayBoards,
    favoriteBoards,
    selectableBoardImages,
    boardsError: error,
    boardsIsLoading: isLoading,
    mutateBoards: mutate,
    addNewBoard,
    updateFavoriteBoards,
    getImages,
  };
};
