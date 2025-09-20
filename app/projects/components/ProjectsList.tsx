"use client";

import { Project as ProjectType } from "../lib/definitions";
import { Project } from "./";
import { useProjects } from "../hooks/useProjects";

interface ProjectsListProps {
  userId: string;
}

export interface ProjectItemType extends ProjectType {
  id: string;
  favorite: boolean;
}

const ProjectsList = ({ userId }: ProjectsListProps) => {
  const { projects, projectsError, projectsIsLoading } = useProjects(userId);

  if (projectsError) return <div>Failed to load projects</div>;
  if (projectsIsLoading) return <div>Loading...</div>;

  return (
    <>
      {projects.map((project: ProjectItemType) => (
        <Project key={project.id} project={project} />
      ))}
    </>
  );
};

export default ProjectsList;
