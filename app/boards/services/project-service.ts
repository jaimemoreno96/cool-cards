"use client";

import axios, { AxiosResponse } from "axios";
import { UpdateProjectResponse } from "@/app/projects/types/projects";
import { ProjectType } from "../lib/definitions";

export const updateProject = async (
  projectId: string,
  data: ProjectType
): Promise<AxiosResponse<UpdateProjectResponse, any>> => {
  try {
    const response = await axios.put<UpdateProjectResponse>(
      "/api/projects", // Correct endpoint path
      { ...data, projectId }, // Data object (axios automatically stringifies)
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response;
  } catch (error) {
    console.error("Error updating project:", error);
    throw new Error("Function not implemented.");
  }
};
