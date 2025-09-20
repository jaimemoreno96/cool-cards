"use client";

import axios, { AxiosResponse } from "axios";
import { UsersResponse } from "../types/users";

export const getMembersByEmail = async (value: string, userId: string): Promise<AxiosResponse<UsersResponse, any>> => {
  try {
    const response = await axios.post<UsersResponse>(
      "/api/users/members", // Correct endpoint path
      { value, userId }, // Data object (axios automatically stringifies)
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    
    return response;
  } catch (error) {
    console.error("Error fetching members:", error);
    throw new Error("Failed to fetch members");
  }
};
