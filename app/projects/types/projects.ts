import { JsonValue } from "@prisma/client/runtime/library";
import { UserDtoType } from "./users";
import { BaseResponse } from "@/app/types/base";

export interface ProjectType {
  id: string;
  name: string;
  description: string | null;
  members: JsonValue | null;
  userId: string;
  favorite: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProjectDtoType {
  id: string;
  name: string;
  description?: string;
  members?: JsonValue;
  userId: string;
  favorite: boolean;
}

export interface SelectedProjectType {
  project: ProjectDtoType;
  members: UserDtoType[];
}

export interface ProjectsResponse extends BaseResponse {
  projects: ProjectDtoType[];
  total?: number;
}

export interface ProjectResponse extends BaseResponse {
  project: ProjectDtoType;
  members: UserDtoType[];
}

export interface UpdateProjectResponse extends BaseResponse {
  project?: ProjectDtoType;
  members?: UserDtoType[];
}

export interface NewProjectResponse extends BaseResponse {
  project: ProjectDtoType;
}
export interface CreateProjectData {
  name: string;
  description?: string;
  members?: string[]; // Array of user IDs
  userId: string;
}

export interface UpdateProjectData {
  name?: string;
  description?: string;
  members?: string[]; // Array of user IDs
}
