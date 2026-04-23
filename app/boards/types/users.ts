import { UserDtoType } from "@/app/projects/types/users";

export type { UserDtoType };

export interface MemberResponse {
    member: UserDtoType;
    error?: string;
}