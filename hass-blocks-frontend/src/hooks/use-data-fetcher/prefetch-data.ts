import { Route } from "next";
import { FilterParams, FilterParamsWithPagination } from "./filter-params";
import { useQueryClient } from "@tanstack/react-query";
import { generateQueryUrlFromParams } from "./generate-query-url-from-params";
import { queryFn } from "./query-fn";

export const preFetchData = async (
  api: Route,
  params?: (FilterParamsWithPagination | FilterParams) & { suspense?: boolean },
) => {
  const queryClient = useQueryClient()
  const url = generateQueryUrlFromParams(api, params)

  await queryClient.prefetchQuery({
    queryKey: [url], queryFn: queryFn(url)
  })
}
