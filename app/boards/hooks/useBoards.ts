import useSWR from "swr";
import axios from "axios";

const fetcher = (url: string) => axios(url).then((res) => res.data);

export const useBoards = (projectId: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/boards/${projectId}`,
    fetcher,
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
    }
  );

  return {
    boards: data,
    boardsError: error,
    boardsIsLoading: isLoading,
    mutateBoards: mutate,
  };
};