import { $Enums } from "@prisma/client";


export enum UserRoles {
    ADMIN = "ADMIN",
    USER = "USER",
}
export interface UserType {
    id: string;
    image: string | null;
    name: string;
    username: string | null;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    emailVerified: Date | null;
    password: string;
    roles: $Enums.users_roles | null;
}

export interface UserDtoType {
    id: string;
    name: string;
    email: string;
    image?: string | null;
}
export interface UsersResponse {
    members: UserDtoType[];
    total?: number;
    error?: string;
}