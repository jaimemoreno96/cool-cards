import axios, { AxiosResponse } from "axios";
import useSWR from "swr";

import {
  ProjectResponse,
  SelectedProjectType,
} from "@/app/projects/types/projects";
import { useProjectsStore } from "@/app/store/projects";

import { ProjectType } from "../lib/definitions";
import { updateProject } from "../../boards/services/project-service";
import { UserDtoType } from "@/app/projects/types/users";

const fetcher = (url: string) =>
  axios(url).then((res: AxiosResponse<ProjectResponse, any>) => res.data);

export const useProject = (projectId: string) => {
  const { setSelectedProject, selectedProject } = useProjectsStore();
  const { data, error, isLoading, mutate } = useSWR(
    `/api/projects/project/${projectId}`,
    fetcher,
    {
      revalidateOnFocus: true,
      shouldRetryOnError: false,
    }
  );

  const project = data?.project;
  const members = data?.members;

  const updateSelectedProject = async (
    userId: string,
    projectId: string,
    data: ProjectType,
    members?: UserDtoType[]
  ) => {
    try {
      const response = await updateProject(projectId || "", data);
      if (response.status !== 200) throw new Error("Failed to update project");
      const updatedProject = response?.data?.project;
      const updatedMembers = response?.data?.members;

      await mutate();

      return { project: updatedProject, members: updatedMembers };
    } catch (error) {
      await mutate();
      throw error;
    }
  };

  return {
    project: {
      project,
      members,
    } as SelectedProjectType,
    updateSelectedProject,
    projectError: error,
    projectIsLoading: isLoading,
    mutateProject: mutate,
  };
};
