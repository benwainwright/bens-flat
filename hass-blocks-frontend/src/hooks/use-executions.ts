import { schema, SchemaTypes } from "@/data/schema";
import {
  useDataFetcher,
} from "./use-data-fetcher/index";
import { SerialisedBlock } from "./use-data-fetcher/serialised-block";
import { FilterParams, FilterParamsWithPagination } from "./use-triggers";

export type Execution = SchemaTypes<typeof schema>["executions"] & {
  parent?: SerialisedBlock;
  instanceOf: SerialisedBlock;
};

export const useExecutions = (
  params?: (FilterParamsWithPagination | FilterParams) & { suspense?: boolean }
) => {
  const { data: executions, error } = useDataFetcher<Execution[]>(
    "/api/executions",
    params,
  );
  return { executions, error };
};
