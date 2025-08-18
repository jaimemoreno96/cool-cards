export const projectDto = (project: any) => {
    return {
        id: project.id,
        name: project.name,
        description: project.description,
        members: project.members,
        userId: project.userId,
        favorite: project.favorite
    };
}