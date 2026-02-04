import { UserDtoType } from "@/app/projects/types/users";
import { BaseResponse } from "@/app/types/base";
import { JsonValue } from "@prisma/client/runtime/library";

export interface BoardType {
  projectId: string | null;
  favorite: boolean;
  name: string;
  id: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  description: string | null;
  image: string | null;
  members: JsonValue | null;
}

export interface BoardDtoType {
  projectId: string;
  favorite: boolean;
  name: string;
  id: string;
  userId: string;
  description?: string;
  image?: string | null;
  members?: JsonValue | null;
}

export interface BoardsResponse extends BaseResponse {
  boards: BoardDtoType[];
  total?: number;
}

export interface BoardResponse extends BaseResponse {
  board?: BoardDtoType;
  members?: UserDtoType[];
}

export interface UpdateBoardResponse extends BaseResponse {
  board?: BoardDtoType;
  members?: UserDtoType[];
}

export interface NewBoardResponse extends BaseResponse {
  board: BoardDtoType;
}

export interface CreateBoardData {
  projectId: string;
  favorite: boolean;
  name: string;
  userId: string;
  description?: string;
  image?: string | null;
  members?: string[];
}

export interface UpdateBoardData {
  projectId?: string;
  favorite?: boolean;
  name?: string;
  description?: string;
  image?: string | null;
  members?: string[];
}
