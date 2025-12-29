import { UserDtoType } from "@/app/projects/types/users";

export interface MemberResponse {
    member: UserDtoType;
    error?: string;
}