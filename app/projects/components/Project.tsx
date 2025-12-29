import Link from "next/link";

import { FavoriteButton } from "./";
import { ProjectItemType } from "./ProjectsList";

interface ProjectProps {
  project: ProjectItemType;
}

const Project = ({ project }: ProjectProps) => {
  return (
    <div className="group relative p-4 border rounded-md shadow hover:shadow-lg transition cursor-pointer h-auto bg-white">
      <Link
        href={`/boards/${project.id}`}
        className="absolute inset-0 z-0"
        aria-label={`View project: ${project.name}`}
      />
      <div className="flex justify-between items-center">
        <h3 className="relative z-10 text-lg font-semibold text-gray-800 truncate pointer-events-none">
          {project.name}
        </h3>
        <FavoriteButton projectId={project.id} isFavorite={project.favorite} />
      </div>
    </div>
  );
};

export default Project;
