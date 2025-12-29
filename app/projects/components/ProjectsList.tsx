"use client";

import { Project as ProjectType } from "../lib/definitions";
import { Project } from "./";
import { useProjects } from "../hooks/useProjects";
import ProjectsListSkeleton from "./ui/ProjectsListSkeleton";

interface ProjectsListProps {
  userId: string;
}

export interface ProjectItemType extends ProjectType {
  id: string;
  favorite: boolean;
}

const ProjectsList = ({ userId }: ProjectsListProps) => {
  const { projects, projectsError, projectsIsLoading } = useProjects(userId);

  console.log("Projects:", projects);
  

  if (projectsError) return <div>Failed to load projects</div>;
  if (projectsIsLoading) return <ProjectsListSkeleton />;

  return (
    <>
      {projects?.map((project: ProjectItemType) => (
        <Project key={project.id} project={project} />
      ))}
    </>
  );
};

export default ProjectsList;
