import axios, { AxiosResponse } from "axios";

import { Board } from "../lib/definitions";
import {
  BoardImage,
  BoardColumnResponse,
  NewBoardResponse,
  UpdateBoardResponse,
  CardResponse,
} from "../types/boards";
import { createClient } from "@/app/utils/client";
import { BaseResponse } from "@/app/types/base";

const updateBoard = async (
  boardId: string,
  boardData: Board
): Promise<AxiosResponse<UpdateBoardResponse, any>> => {
  try {
    const response = await axios.put<UpdateBoardResponse>(
      "/api/boards",
      { ...boardData, boardId },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response;
  } catch (error) {
    console.error("Error updating board:", error);
    throw error;
  }
};

const createBoard = async (
  userId: string,
  projectId: string,
  boardData: Board,
  boardImage?: BoardImage | null
): Promise<AxiosResponse<NewBoardResponse, any>> => {
  // Implementation for creating a board goes here
  try {
    const response = await axios.post<NewBoardResponse>(
      "api/boards",
      { ...boardData, userId, projectId, image: boardImage },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response;
  } catch (error) {
    console.error("Error creating board:", error);
    throw error;
  }
};

const setFavoriteBoard = async (
  boardId: string,
  userId: string,
  favorite: boolean
) => {
  try {
    const response = await axios.put<BaseResponse>(
      "/api/boards/favorite",
      {
        boardId,
        userId,
        favorite,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response;
  } catch (error) {
    console.error("Error setting favorite board:", error);
    throw error; // Re-throw the error for further handling if needed
  }
};

const createBoardColumn = async (
  userId: string,
  boardId: string,
  columnName: string,
  position: number
): Promise<AxiosResponse<BoardColumnResponse, any>> => {
  try {
    const response = await axios.post<BoardColumnResponse>(
      "/api/boards/board/column",
      {
        userId,
        boardId,
        columnName,
        position,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Create Board Column Response:", response);

    return response;
  } catch (error) {
    console.error("Error adding board column:", error);
    throw error; // Re-throw the error for further handling if needed
  }
};

const updateBoardColumn = async (
  userId: string,
  boardColumnId: string,
  boardColumnName: string,
  newPosition: number
): Promise<AxiosResponse<BoardColumnResponse, any>> => {
  try {
    const response = await axios.put<BoardColumnResponse>(
      "/api/boards/board/column",
      {
        userId,
        boardColumnId,
        boardColumnName,
        newPosition,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response;
  } catch (error) {
    console.error("Error moving board column:", error);
    throw error; // Re-throw the error for further handling if needed
  }
};

const createCard = async (
  userId: string,
  boardId: string,
  boardColumnId: string,
  cardName: string,
  position: number
): Promise<AxiosResponse<CardResponse, any>> => {
  try {
    const response = await axios.post<CardResponse>(
      "/api/boards/board/card",
      {
        userId,
        boardId,
        boardColumnId,
        cardName,
        position,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response;
  } catch (error) {
    console.error("Error creating card:", error);
    throw error; // Re-throw the error for further handling if needed
  }
};

const updateCard = async (
  userId: string,
  cardId: string,
  boardColumnId: string,
  cardName: string,
  cardDescription: string | null | undefined,
  position: number
): Promise<AxiosResponse<BoardColumnResponse, any>> => {
  try {
    const response = await axios.put<BoardColumnResponse>(
      "/api/boards/board/card",
      {
        userId,
        cardId,
        boardColumnId,
        cardName,
        cardDescription,
        position,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response;
  } catch (error) {
    console.error("Error updating card:", error);
    throw error; // Re-throw the error for further handling if needed
  }
};

const fetchImages = async () => {
  const supabase = createClient();

  try {
    const { data, error } = await supabase.storage
      .from("cool_cards_bucket")
      .list();

    console.log("Data images:", data);

    if (error) {
      console.error("Error fetching images:", error);
      throw new Error("Failed to fetch images", error);
    }

    const imageUrls: Promise<BoardImage>[] = data.map(async (file) => {
      const { data: urlData } = supabase.storage
        .from("cool_cards_bucket")
        .getPublicUrl(file.name);

      return {
        name: file.name,
        url: urlData.publicUrl,
      };
    });

    return Promise.all(imageUrls);
  } catch (error) {
    console.error("Error fetching images:", error);
    throw new Error("Failed to fetch images", error as Error);
  }
};

const boardService = {
  createBoard,
  updateBoard,
  createBoardColumn,
  updateBoardColumn,
  createCard,
  updateCard,
  fetchImages,
  setFavoriteBoard,
};

export default boardService;
