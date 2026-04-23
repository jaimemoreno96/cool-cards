import useSWR from "swr";
import axios, { AxiosResponse } from "axios";

import { useProjectsStore } from "@/app/store/projects";

import { ProjectDtoType, ProjectsResponse } from "../types/projects";
import { createProject, setFavoriteProject } from "../data/project";

import { mergeOptimisticUpdates } from "../../lib/merge-optimistic-updates";

const fetcher = (url: string) =>
  axios(url).then((res: AxiosResponse<ProjectsResponse, any>) => res.data);

export const useProjects = (userId: string) => {
  const { optimisticProjects, clearOptimisticProjects, setOptimisticProjects } =
    useProjectsStore();

  const { data, error, isLoading, mutate } = useSWR(
    userId ? `/api/projects/${userId}` : null,
    fetcher,
    {
      revalidateOnFocus: true,
      shouldRetryOnError: false,
    }
  );

  const projects = data?.projects ?? [];
  const displayProjects =
    optimisticProjects.length > 0
      ? mergeOptimisticUpdates(projects, optimisticProjects)
      : projects;

  const favoritedProjects = displayProjects.filter((p) => p.favorite);

  const updateFavoritedProjects = async (
    projectId: string,
    isFavorite: boolean
  ) => {
    try {
      const response = await setFavoriteProject(projectId, userId, isFavorite);

      if (response.status !== 200) {
        throw new Error("Failed to update");
      }

      await mutate();

      clearOptimisticProjects();
    } catch (error) {
      await mutate();
      clearOptimisticProjects();
    }
  };

  const addNewProject = async (
    userId: string,
    data: { name: string; description?: string; members?: string }
  ) => {
    const optimisticProject: ProjectDtoType = {
      id: `temp-${Date.now()}`,
      name: data.name,
      description: data.description,
      members: data.members,
      userId: userId,
      favorite: false,
    };
    setOptimisticProjects(optimisticProject);
    try {
      const response = await createProject(userId, data);

      if (response.status !== 200) throw new Error("Failed to create project");

      await mutate();
      clearOptimisticProjects();

      return response.data.project;
    } catch (error) {
      await mutate();
      clearOptimisticProjects();
      throw error;
    }
  };

  return {
    projects: displayProjects,
    favoritedProjects,
    updateFavoritedProjects,
    addNewProject,
    projectsError: error,
    projectsIsLoading: isLoading,
    mutateProjects: mutate,
  };
};
