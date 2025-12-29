import useSWR from "swr";
import axios, { Axios, AxiosResponse } from "axios";
import { ProjectResponse } from "@/app/projects/types/projects";

const fetcher = (url: string) => axios(url).then((res: AxiosResponse<ProjectResponse, any>) => res.data);

export const useProject = (projectId: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/projects/project/${projectId}`,
    fetcher,
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
    }
  );

  return {
    project: data,
    projectError: error,
    projectIsLoading: isLoading,
    mutateProject: mutate,
  };
};
