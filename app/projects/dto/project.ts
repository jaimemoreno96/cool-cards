import { ProjectDtoType, ProjectType } from "../types/projects";

export const projectDto = (project: ProjectType): ProjectDtoType => {
    return {
        id: project.id,
        name: project.name,
        description: project.description || "",
        members: project.members,
        userId: project.userId || "",
        favorite: project.favorite
    };
}