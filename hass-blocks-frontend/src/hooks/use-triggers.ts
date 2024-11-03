import { schema, SchemaTypes } from "@/data/schema";
import { useDataFetcher } from "./use-data-fetcher";

export interface FilterParams {
  type?: string;
  id?: string;
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

export const useTriggers = (
  params?: (FilterParamsWithPagination | FilterParams) & { suspense?: boolean }
) => {
  const { data, error } = useDataFetcher<Execution[]>(
    "/api/triggers",
    params,
  );
  return { triggers: data, error };
};
