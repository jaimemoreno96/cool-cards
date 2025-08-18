import Link from "next/link";

import { Project as ProjectType } from "../lib/definitions";

import { FavoriteButton } from "./";

interface ProjectProps {
  project: ProjectType & {
    id: string;
    favorite: boolean;
  };
}

const Project = ({ project }: ProjectProps) => {
  return (
    <div className="group relative p-4 border rounded-md shadow hover:shadow-lg transition cursor-pointer">
      <Link
        href={`/projects/${project.id}`}
        className="absolute inset-0 z-0"
        aria-label={`View project: ${project.name}`}
      />
      <div className="flex justify-between items-center">
        <h3 className="relative z-10 text-lg font-semibold text-gray-800 truncate pointer-events-none">
          {project.name}
        </h3>
        <FavoriteButton projectId={project.id} isFavorite={project.favorite} />
      </div>
      <p className="relative z-10 text-sm text-gray-600 mt-2 line-clamp-2 pointer-events-none">
        {project.description}
      </p>
    </div>
  );
};

export default Project;
