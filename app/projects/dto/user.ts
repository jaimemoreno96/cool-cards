import { UserDtoType, UserType } from "../types/users";

export const userDto = (user: UserType): UserDtoType => {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
    };
}