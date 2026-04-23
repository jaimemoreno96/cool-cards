import Link from "next/link";

import FavoriteButton from "./favorite-button";
import { ProjectDtoType } from "../../types/projects";
import { Loader2 } from "lucide-react";

interface ProjectItemProps {
  project: ProjectDtoType;
  userId: string;
  updateFavoritedProjects: (
    projectId: string,
    isFavorite: boolean
  ) => Promise<void>;
  isOptimistic?: boolean;
}

const ProjectItem = ({
  project,
  updateFavoritedProjects,
  isOptimistic,
}: ProjectItemProps) => {
  const handleFavoriteOnClick = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (isOptimistic) return;
    await updateFavoritedProjects(project.id, !project.favorite);
  };

  return (
    <div
      className={`
      group relative p-4 border rounded-md shadow hover:shadow-lg 
      transition cursor-pointer h-auto bg-white
      ${isOptimistic ? "opacity-60 pointer-events-none" : "hover:shadow-lg"}
    `}
    >
      {!isOptimistic && (
        <Link
          href={`/projects/${project.id}`}
          className="absolute inset-0 z-0"
          aria-label={`View project: ${project.name}`}
        />
      )}
      <div className="flex justify-between items-center">
        <h3 className="relative z-10 text-lg font-semibold text-gray-800 truncate pointer-events-none">
          {project.name}
          {isOptimistic && (
            <span className="ml-2 text-sm font-normal text-gray-500">
              (creating...)
            </span>
          )}
        </h3>
        <FavoriteButton
          isFavorite={project.favorite}
          handleFavoriteOnClick={handleFavoriteOnClick}
          disabled={isOptimistic}
        />
      </div>
      {isOptimistic && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/30 rounded-md">
          <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
        </div>
      )}
    </div>
  );
};

export default ProjectItem;
