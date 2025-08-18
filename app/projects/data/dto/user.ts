export const userDto = (user: any) => {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
    };
}