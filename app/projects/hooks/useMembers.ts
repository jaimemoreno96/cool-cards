import useSWR from "swr";
import axios from "axios";

const fetcher = (url: string) => axios(url).then((res) => res.data);

export const useMembers = () => {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/projects/members`,
    fetcher,
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
    }
  );

  return {
    membersData: data,
    membersError: error,
    membersIsLoading: isLoading,
    mutateMembers: mutate,
  };
};
