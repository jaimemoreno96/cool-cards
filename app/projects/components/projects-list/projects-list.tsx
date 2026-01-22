"use client";

import { PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useProjects } from "../../hooks/useProjects";
import ProjectsListSkeleton from "../ui/ProjectsListSkeleton";
import EmptyProjects from "./empty-projects";
import NewProject from "./new-project";
import ProjectItem from "./project-item";

import { Project as ProjectType } from "../../lib/definitions";

interface ProjectsListProps {
  userId: string;
}

export interface ProjectItemType extends ProjectType {
  id: string;
  favorite: boolean;
}

const ProjectsList = ({ userId }: ProjectsListProps) => {
  const { projects, projectsError, projectsIsLoading } = useProjects(userId);

  console.log("User ID:", userId);
  
  console.log("Projects:", projects);

  if (projectsError) return <div>Failed to load projects</div>;
  if (projectsIsLoading) return <ProjectsListSkeleton />;

  return (
    <>
      {projects?.length === 0 ? (
        <EmptyProjects userId={userId} />
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-4 p-8 w-full">
          <NewProject userId={userId || ""}>
            <Button
              className="w-full h-auto shadow hover:shadow-lg transition cursor-pointer"
              variant="outline"
            >
              <PlusIcon className="w-4 h-4 text-black mr-2" />
              New Project
            </Button>
          </NewProject>
          {projects?.map((project: ProjectItemType) => (
            <ProjectItem key={project.id} project={project} userId={userId} />
          ))}
        </div>
      )}
    </>
  );
};

export default ProjectsList;
