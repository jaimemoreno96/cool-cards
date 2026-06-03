import { JsonValue } from "@prisma/client/runtime/client";

import { UserDtoType } from "@/app/projects/types/users";
import { BaseResponse } from "@/app/types/base";

export interface BoardType {
  projectId: string | null;
  favorite: boolean;
  name: string;
  id: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  description: string | null;
  imageName: string | null;
  imageUrl: string | null;
  members: JsonValue | null;
}

export interface BoardColumnType {
  id: string;
  boardId: string;
  name: string;
  position: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CardType {
  id: string;
  userId: string;
  boardId: string;
  boardColumnId: string;
  name: string;
  description: string | null;
  position: number;
  tags: JsonValue | null;
  image: string | null;
  members: JsonValue | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface BoardDtoType {
  projectId: string;
  favorite: boolean;
  name: string;
  id: string;
  userId: string;
  description?: string;
  imageName?: string | null
  imageUrl?: string | null;
  members?: JsonValue | null;
  membersData?: UserDtoType[] | null;
}

export interface BoardColumnDtoType {
  id: string;
  boardId: string;
  name: string;
  position: number;
  cards?: CardDtoType[];
}

export interface CardDtoType {
  id: string;
  userId: string;
  boardId: string;
  boardColumnId: string;
  name: string;
  description?: string | null;
  position: number;
  tags?: JsonValue | null;
  image?: string | null;
  members?: JsonValue | null;
}

export interface BoardImage {
  name: string;
  url: string;
}

export interface BoardsResponse extends BaseResponse {
  boards: BoardDtoType[];
  total?: number;
}

export interface BoardResponse extends BaseResponse {
  board?: BoardDtoType;
  members?: UserDtoType[];
  boardColumns?: BoardColumnDtoType[];
}

export interface UpdateBoardResponse extends BaseResponse {
  board?: BoardDtoType;
  members?: UserDtoType[];
}

export interface NewBoardResponse extends BaseResponse {
  board: BoardDtoType;
}

export interface BoardColumnResponse extends BaseResponse {
  boardColumn: BoardColumnDtoType;
}

export interface CardResponse extends BaseResponse {
  card: CardDtoType;
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
