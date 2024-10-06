import {
  FilterParams,
  FilterParamsWithPagination,
  useDataFetcher,
} from "./use-data-fetcher";

const fetcher = async (url: string) => {
  const response = await fetch(url);
  return await response.json();
};

export const useExecutionsCount = (
  params?: (FilterParamsWithPagination | FilterParams) & {
    keepPreviousData?: boolean;
  },
) => {
  const { data, error } = useDataFetcher<{ count: number }>(
    "api/executions/count",
    params,
  );
  return { count: data?.count, error };
};
