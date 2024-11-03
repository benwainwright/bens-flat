import { Route } from "next";
import { FilterParams, FilterParamsWithPagination } from "./filter-params";

export const generateQueryUrlFromParams = (
  api: Route,
  params?: (FilterParamsWithPagination | FilterParams) & { suspense?: boolean },
) => {
  const { suspense: suspenseParam, ...queryStringParams } = params ?? {};

  const queryString = Object.entries(queryStringParams)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join("&");

  const queryAddendum = queryString ? `?${queryString}` : "";

  const key = `${api}${queryAddendum}`

  return key.startsWith("/") ? key.slice(1) : key
}
