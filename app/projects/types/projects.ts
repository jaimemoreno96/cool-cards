import { JsonValue } from "@prisma/client/runtime/library";

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

export interface BaseResponse {
    error?: string;
}

export interface ProjectsResponse extends BaseResponse {
    projects: ProjectType[];
    total?: number;
}

export interface CreateProjectData {
    name: string;
    description?: string;
    members?: string[]; // Array of user IDs
    userId: string;
}

export interface NewProjectResponse extends BaseResponse {
    project?: ProjectDtoType;
}
