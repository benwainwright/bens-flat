import { schema, SchemaTypes } from "@/data/schema";
import {
  FilterParams,
  FilterParamsWithPagination,
  useDataFetcher,
} from "./use-data-fetcher";

export type Block = SchemaTypes<typeof schema>["blocks"];

export const useBlocks = (
  params?: (FilterParamsWithPagination | FilterParams) & { suspense?: boolean },
) => {
  const { data: blocks, error } = useDataFetcher<Block[]>("api/blocks", params);
  return { blocks, error };
};
