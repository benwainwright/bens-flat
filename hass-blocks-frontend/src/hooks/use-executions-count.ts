import useSWR from "swr";
import { FilterParams, FilterParamsWithPagination } from "./use-executions";

const fetcher = async (url: string) => {
  const response = await fetch(url);
  return await response.json();
};

export const useExecutionsCount = (
  params?: (FilterParamsWithPagination | FilterParams) & {
    keepPreviousData?: boolean;
  }
) => {
  const queryString = params
    ? Object.entries(params)
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join("&")
    : ``;

  const query = queryString ? `?${queryString}` : "";

  const { data, error } = useSWR<{ count: number }>(
    `/api/executions/count${query}`,
    fetcher,
    {
      keepPreviousData: params?.keepPreviousData,
      suspense: true,
      refreshInterval: 250,
    }
  );
  return { count: data?.count, error };
};
