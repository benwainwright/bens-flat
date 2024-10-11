import { schema, SchemaTypes } from "@/data/schema";
import { Route } from "next";
import useSWR from "swr";

const fetcher = async (url: string) => {
  const response = await fetch(url);
  return await response.json();
};

export interface FilterParams {
  type?: string;
  id?: string;
  executionId?: string;
  triggerId?: string;
  status?: string;
  notType?: string;
  parentId?: string;
  blockId?: string;
}

export interface FilterParamsWithPagination extends FilterParams {
  page: number;
  pageSize: number;
}

export interface SerialisedBlock {
  id: string;
  status: string;
  name: string;
  type: string;
}

export const useDataFetcher = <T>(
  api: Route,
  params?: (FilterParamsWithPagination | FilterParams) & {
    keepPreviousData?: boolean;
    suspense?: boolean;
  },
  fallback?: T,
): { data: T | undefined; error: Error | undefined } => {
  const { suspense, keepPreviousData, ...queryStringParams } = params ?? {};

  const queryString = Object.entries(queryStringParams)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join("&");

  const query = queryString ? `?${queryString}` : "";

  const { data, error } = useSWR<T>(`${api}${query}`, fetcher, {
    refreshInterval: 250,
    keepPreviousData,
    suspense,
    fallbackData: fallback,
  });
  return { data, error };
};
