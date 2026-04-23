"use client";

import { PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useProjects } from "../../hooks/use-projects";
import ProjectsListSkeleton from "../ui/projects-list-skeleton";
import EmptyProjectsList from "./empty-projects-list";
import NewProject from "./new-project";
import ProjectItem from "./project-item";

import { ProjectDtoType } from "../../types/projects";
import { useProjectsStore } from "@/app/store/projects";

interface ProjectsListProps {
  userId: string;
}

const ProjectsList = ({ userId }: ProjectsListProps) => {
  const {
    projects,
    projectsError,
    projectsIsLoading,
    updateFavoritedProjects,
  } = useProjects(userId);

  // Get optimistic projects from store to check if we're creating
  const { optimisticProjects } = useProjectsStore();

  if (projectsError) return <div>Failed to load projects</div>;
  if (projectsIsLoading) return <ProjectsListSkeleton />;

  const realProjects = projects?.filter((p) => !p.id.startsWith("temp-")) || [];
  const optimisticProjectsList =
    projects?.filter((p) => p.id.startsWith("temp-")) || [];

  if (realProjects.length === 0 && optimisticProjectsList.length === 0) {
    return <EmptyProjectsList userId={userId} />;
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-4 p-4 w-full h-auto">
      <NewProject userId={userId || ""}>
        <Button
          className={`w-full h-[68px] shadow hover:shadow-lg transition cursor-pointer ${
            optimisticProjects.length > 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          variant="outline"
          disabled={optimisticProjects.length > 0}
        >
          <PlusIcon className="w-4 h-4 text-black mr-2" />
          {optimisticProjects.length > 0 ? "Creating..." : "New Project"}
        </Button>
      </NewProject>
      {/* Show optimistic projects first (they're newest) */}
      {optimisticProjectsList.map((project: ProjectDtoType) => (
        <ProjectItem
          key={project.id}
          project={project}
          userId={userId}
          updateFavoritedProjects={updateFavoritedProjects}
          isOptimistic={true} // You'll need to add this prop to ProjectItem
        />
      ))}

      {/* Show real projects */}
      {realProjects.map((project: ProjectDtoType) => (
        <ProjectItem
          key={project.id}
          project={project}
          userId={userId}
          updateFavoritedProjects={updateFavoritedProjects}
        />
      ))}
    </div>
  );
};

export default ProjectsList;
