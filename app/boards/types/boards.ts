import { JsonValue } from "@prisma/client/runtime/library";

export interface BoardType {
    projectId: string;
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