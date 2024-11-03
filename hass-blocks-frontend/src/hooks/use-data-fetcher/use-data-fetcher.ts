"use client"

import { Route } from "next";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { generateQueryUrlFromParams } from "./generate-query-url-from-params";
import { queryFn } from "./query-fn";
import { FilterParams, FilterParamsWithPagination } from "./filter-params";

export const useDataFetcher = <T>(
  api: Route,
  params?: (FilterParamsWithPagination | FilterParams) & { refetchInterval?: number, suspense?: boolean },
): { data: T | undefined; error: Error | undefined } => {
  const url = generateQueryUrlFromParams(api, params)

  const queryHook = typeof params?.suspense === 'undefined' || params.suspense === true ? useSuspenseQuery : useQuery

  const { data, error } = queryHook({
    queryKey: [url], queryFn: queryFn(url),
    refetchInterval: params?.refetchInterval ?? 1000
  })


  return { data, error: error ?? undefined };
};

