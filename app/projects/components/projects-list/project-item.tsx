import Link from "next/link";

import FavoriteButton from "./favorite-button";
import { ProjectDtoType } from "../../types/projects";

interface ProjectItemProps {
  project: ProjectDtoType;
  userId: string;
}

const ProjectItem = ({ project, userId }: ProjectItemProps) => {
  return (
    <div className="group relative p-4 border rounded-md shadow hover:shadow-lg transition cursor-pointer h-auto bg-white">
      <Link
        href={`/projects/${project.id}`}
        className="absolute inset-0 z-0"
        aria-label={`View project: ${project.name}`}
      />
      <div className="flex justify-between items-center">
        <h3 className="relative z-10 text-lg font-semibold text-gray-800 truncate pointer-events-none">
          {project.name}
        </h3>
        <FavoriteButton projectId={project.id} userId={userId} isFavorite={project.favorite} />
      </div>
    </div>
  );
};

export default ProjectItem;
