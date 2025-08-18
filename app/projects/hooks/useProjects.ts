import useSWR from "swr";
import axios from "axios";

const fetcher = (url: string) => axios(url).then((res) => res.data);

export const useProjects = (userId: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/projects/${userId}`,
    fetcher,
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
    }
  );

  return {
    projects: data,
    projectsError: error,
    projectsIsLoading: isLoading,
    mutateProjects: mutate,
  };
};
