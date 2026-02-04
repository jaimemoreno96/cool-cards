"use client";

import { PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useProjects } from "../../hooks/useProjects";
import ProjectsListSkeleton from "../ui/ProjectsListSkeleton";
import EmptyProjectsList from "./empty-projects-list";
import NewProject from "./new-project";
import ProjectItem from "./project-item";

import { ProjectDtoType } from "../../types/projects";

interface ProjectsListProps {
  userId: string;
}

const ProjectsList = ({ userId }: ProjectsListProps) => {
  const { projects, projectsError, projectsIsLoading } = useProjects(userId);

  if (projectsError) return <div>Failed to load projects</div>;
  if (projectsIsLoading) return <ProjectsListSkeleton />;

  return (
    <>
      {projects?.length === 0 ? (
        <EmptyProjectsList userId={userId} />
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-4 p-4 w-full h-auto">
          {projects?.map((project: ProjectDtoType) => (
            <ProjectItem key={project.id} project={project} userId={userId} />
          ))}
          <NewProject userId={userId || ""}>
            <Button
              className="w-full h-[68px] shadow hover:shadow-lg transition cursor-pointer"
              variant="outline"
            >
              <PlusIcon className="w-4 h-4 text-black mr-2" />
              New Project
            </Button>
          </NewProject>
        </div>
      )}
    </>
  );
};

export default ProjectsList;
