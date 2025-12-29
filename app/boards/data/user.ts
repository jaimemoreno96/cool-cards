import axios, { AxiosResponse } from "axios";
import { MemberResponse } from "../types/users";

export const getMemberById = async (
  userId: string
): Promise<AxiosResponse<MemberResponse, any>> => {
  try {
    const response = await axios.get<MemberResponse>(
      `/api/users/members/${userId}`, // Correct endpoint path
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response;
  } catch (error) {
    console.error("Error fetching member: ", error);
    throw new Error("Failed to fetch member");
  }
};
