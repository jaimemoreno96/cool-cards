"use client";

import { useProjects } from "../../hooks/use-projects";
import { ProjectDtoType } from "../../types/projects";
import ProjectItem from "../projects-list/project-item";
import { ProjectsListSkeleton } from "../ui";
import EmptyFavoriteProjectsList from "./empty-favorite-projects-list";

interface FavoriteProjectsListProps {
  userId: string;
}
const FavoriteProjectsList = ({ userId }: FavoriteProjectsListProps) => {
  const {
    favoritedProjects,
    projectsError,
    projectsIsLoading,
    updateFavoritedProjects,
  } = useProjects(userId);
  if (projectsError) return <div>Failed to load projects</div>;
  if (projectsIsLoading) return <ProjectsListSkeleton />;

  return (
    <>
      {favoritedProjects?.length === 0 ? (
        <EmptyFavoriteProjectsList />
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-4 p-4 w-full">
          {favoritedProjects?.map((project: ProjectDtoType) => (
            <ProjectItem
              key={project.id}
              project={project}
              userId={userId}
              updateFavoritedProjects={updateFavoritedProjects}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default FavoriteProjectsList;
