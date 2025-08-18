"use client";
import useSWR from "swr";
import { Project as ProjectType } from "../lib/definitions";
import { Project } from "./";
import { useProjects } from "../hooks/useProjects";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface ProjectsListProps {
  userId: string;
}

interface ProjectItemType extends ProjectType {
  id: string;
  favorite: boolean;
}

const ProjectsList = ({ userId }: ProjectsListProps) => {
  const { projects, projectsError, projectsIsLoading } = useProjects(userId);

  if (projectsError) return <div>Failed to load projects</div>;
  if (projectsIsLoading) return <div>Loading...</div>;

  return (
    <>
      {projects.map(
        (project: ProjectType & { id: string; favorite: boolean }) => (
          <Project
            key={project.id}
            project={project as ProjectType & { id: string; favorite: boolean }}
          />
        )
      )}
    </>
  );
};

export default ProjectsList;
