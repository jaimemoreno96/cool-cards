import axios, { AxiosResponse } from "axios";
import useSWR from "swr";

import {
  ProjectResponse,
  SelectedProjectType,
} from "@/app/projects/types/projects";
import { useProjectsStore } from "@/app/store/projects";
import { ProjectType } from "../lib/definitions";
import { updateProject } from "../data/project";
import { UserDtoType } from "@/app/projects/types/users";

const fetcher = (url: string) =>
  axios(url).then((res: AxiosResponse<ProjectResponse, any>) => res.data);

export const useProject = (projectId: string) => {
  const { setSelectedProject, selectedProject } = useProjectsStore();
  const { data, error, isLoading, mutate } = useSWR(
    `/api/projects/project/${projectId}`,
    fetcher,
    {
      onSuccess: (data: ProjectResponse) => {
        console.log("Fetched project data:", data);
        setSelectedProject({
          project: data?.project,
          members: data?.members,
        });
      },
      revalidateOnFocus: false,
      shouldRetryOnError: false,
    }
  );

  const updatSelectedProject = async (
    userId: string,
    projectId: string,
    data: ProjectType,
    members?: UserDtoType[]
  ) => {
    const currentSelectedProject = selectedProject;
    const optimisticProject: SelectedProjectType = {
      project: {
        id: projectId,
        userId,
        favorite: currentSelectedProject?.project.favorite || false,
        name: data.name,
        description: data.description,
        members: data.members,
      },
      members: members || currentSelectedProject?.members || [],
    };
    setSelectedProject(optimisticProject);
    try {
      const response = await updateProject(projectId || "", data);
      if (response.status !== 200) throw new Error("Failed to update project");
      const updatedProject = response?.data?.project;
      const updatedMembers = response?.data?.members;

      setSelectedProject({
        project: updatedProject,
        members: updatedMembers,
      } as SelectedProjectType);
      await mutate();

      return { project: updatedProject, members: updatedMembers };
    } catch (error) {
      setSelectedProject(currentSelectedProject);
    }
  };

  return {
    project: data
      ? ({
          project: data.project,
          members: data.members,
        } as SelectedProjectType)
      : selectedProject,
    updatSelectedProject,
    projectError: error,
    projectIsLoading: isLoading,
    mutateProject: mutate,
  };
};
