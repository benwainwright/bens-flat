import { schema, SchemaTypes } from "@/data/schema";
import {
  FilterParams,
  FilterParamsWithPagination,
  SerialisedBlock,
  useDataFetcher,
} from "./use-data-fetcher";

export type Execution = SchemaTypes<typeof schema>["executions"] & {
  parent?: SerialisedBlock;
  instanceOf: SerialisedBlock;
};

export const useExecutions = (
  params?: (FilterParamsWithPagination | FilterParams) & { suspense?: boolean },
) => {
  const { data: executions, error } = useDataFetcher<Execution[]>(
    "api/executions",
    params,
  );
  return { executions, error };
};
