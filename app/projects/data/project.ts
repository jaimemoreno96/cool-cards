"use client";

import axios, { AxiosResponse } from "axios";
import { Project } from "../lib/definitions";
import { BaseResponse, NewProjectResponse } from "../types/projects";

export const createProject = async (
  userId: string,
  data: Project
): Promise<AxiosResponse<NewProjectResponse, any>> => {
  try {
    const response = await axios.post<NewProjectResponse>(
      "/api/projects", // Correct endpoint path
      { ...data, userId }, // Data object (axios automatically stringifies)
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response;
  } catch (error) {
    console.error("Error creating project:", error);
    throw error; // Re-throw the error for further handling if needed
  }
};

export const setFavoriteProject = async (
  projectId: string,
  userId: string,
  favorite: boolean
) => {
  try {
    const response = await axios.put<BaseResponse>(
      "/api/projects/favorite",
      {
        projectId,
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
    console.error("Error setting favorite project:", error);
    throw error; // Re-throw the error for further handling if needed
  }
};
