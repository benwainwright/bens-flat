import { schema, SchemaTypes } from "@/data/schema";
import {
  FilterParams,
  FilterParamsWithPagination,
  SerialisedBlock,
  useDataFetcher,
} from "./use-data-fetcher";

export type Event = SchemaTypes<typeof schema>["events"] & {
  parent?: SerialisedBlock;
  instanceOf: SerialisedBlock;
};

export const useEvents = (
  params?: (FilterParamsWithPagination | FilterParams) & { suspense: boolean },
) => {
  const { data: events, error } = useDataFetcher<Event[]>(
    "api/events",
    params,
    [],
  );
  return { events, error };
};
