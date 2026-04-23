import axios, { AxiosResponse } from "axios";
import { Board } from "../lib/definitions";
import { BoardImage, NewBoardResponse, UpdateBoardResponse } from "../types/boards";
import { createClient } from "@/app/utils/client";
import { BaseResponse } from "@/app/types/base";

export const updateBoard = async (
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

export const createBoard = async (
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

export const setFavoriteBoard = async (boardId: string, userId: string, favorite: boolean) => {
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
}

export const fetchImages = async () => {
    const supabase = createClient();

    try {
        const { data, error } = await supabase.storage
            .from('cool_cards_bucket')
            .list();

            console.log("Data images:", data);
            
        if (error) {
            console.error("Error fetching images:", error);
            throw new Error("Failed to fetch images", error);
        }

        const imageUrls: Promise<BoardImage>[] = data.map(async (file) => {
            const { data: urlData } = supabase.storage
              .from('cool_cards_bucket')
              .getPublicUrl(file.name)
            
            return {
              name: file.name,
              url: urlData.publicUrl
            }
          
        });

        return Promise.all(imageUrls);
    } catch (error) {
        console.error("Error fetching images:", error);
        throw new Error("Failed to fetch images", error as Error);
    }
}
