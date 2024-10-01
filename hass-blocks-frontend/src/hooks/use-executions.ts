import { schema, SchemaTypes } from "@/data/schema";
import useSWR from "swr";

const fetcher = async (url: string) => {
  const response = await fetch(url);
  return await response.json();
};

interface FilterParams {
  type?: string;
  id?: string;
  triggerId?: string;
  status?: string;
  parentId?: string;
}

interface FilterParamsWithPagination extends FilterParams {
  page: number;
  pageSize: number;
}

interface SerialisedBlock {
  id: string;
  status: string;
  name: string;
  type: string;
}

export type Execution = SchemaTypes<typeof schema>["executions"] & {
  parent?: SerialisedBlock;
  instanceOf: SerialisedBlock;
};

export const useExecutions = (
  params: FilterParamsWithPagination | FilterParams
) => {
  const queryString = Object.entries(params)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join("&");

  const query = queryString ? `?${queryString}` : "";

  const { data: executions, error } = useSWR<Execution[]>(
    `/api/executions${query}`,
    fetcher
  );
  return { executions, error };
};
