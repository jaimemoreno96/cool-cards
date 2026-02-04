import useSWR from "swr";
import axios from "axios";
import { useProjectsStore } from "@/app/store/projects";
import { ProjectDtoType, ProjectsResponse } from "../types/projects";
import { createProject, setFavoriteProject } from "../data/project";

const fetcher = (url: string) => axios(url).then((res) => res.data);

export const useProjects = (userId: string) => {
  const {
    projects,
    setProjects,
    favoritedProjects,
    setFavoriteProjects,
    addProject,
    setError,
  } = useProjectsStore();

  const { data, error, isLoading, mutate } = useSWR(
    `/api/projects/${userId}`,
    fetcher,
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
      onSuccess: (data: ProjectsResponse) => {
        console.log("Data:", data);
        setProjects(data.projects);
        setFavoriteProjects(data.projects);
      },
      onError(err, key, config) {
        setError(err.message);
      },
    }
  );

  const updateFavoritedProjects = async (
    projectId: string,
    isFavorite: boolean
  ) => {
    const projectIndex = projects.findIndex(
      (project) => project.id === projectId
    );

    if (projectIndex === -1) {
      return;
    }

    projects[projectIndex].favorite = isFavorite;

    try {
      const response = await setFavoriteProject(projectId, userId, isFavorite);
      if (response.status !== 200) {
        projects[projectIndex].favorite = !isFavorite;
      }
    } catch (error) {
      projects[projectIndex].favorite = !isFavorite;
    }

    setFavoriteProjects(projects);
    setProjects(projects);
    await mutate();
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
    const currentProjects = [...projects];
    addProject(optimisticProject);
    try {
      const response = await createProject(userId, data);
      if (response.status !== 200) throw new Error("Failed to create project");
      const newProject = response.data.project;
      const updatedProjects = projects.map((project) =>
        project.id === optimisticProject.id ? newProject : project
      );
      setProjects(updatedProjects);
      await mutate();

      return newProject;
    } catch (error) {
      setProjects(currentProjects);
    }
  };

  return {
    projects: data?.projects || projects,
    favoritedProjects: favoritedProjects,
    updateFavoritedProjects,
    addNewProject,
    projectsError: error,
    projectsIsLoading: isLoading,
    mutateProjects: mutate,
  };
};
