import Container from "@mui/material/Container";

import { LogPage } from "../log-page/log-page";
import { Route } from "next";
import { useDataFetcher } from "@/hooks/use-data-fetcher";
import { GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import { useState } from "react";

interface EventLogProps<T> {
  triggerId?: string;
  initialPage?: number;
  initialPageSize?: number;
  api: Route;
  countApi: Route;
  gridColumns: GridColDef[];
  pageMapper: (item: T) => Record<string, unknown>;
}

export const Log = <T,>({
  triggerId,
  initialPage,
  initialPageSize,
  countApi,
  api,
  pageMapper,
  gridColumns,
}: EventLogProps<T>) => {
  const [page, setPage] = useState<number>(initialPage ?? 10);
  const [pageSize, setPageSize] = useState<number>(initialPageSize ?? 0);

  const onPaginationModelChange = (model: GridPaginationModel) => {
    setPage(model.page);
    setPageSize(model.pageSize);
  };

  const { data } = useDataFetcher<{ count: number }>(countApi, {
    keepPreviousData: true,
  });

  return (
    <>
      <Container sx={{ padding: "1rem" }}>
        <LogPage
          cols={gridColumns}
          api={api}
          page={page}
          pageSize={pageSize}
          triggerId={triggerId}
          totalRowCount={data?.count ?? 0}
          onPaginationModelChange={onPaginationModelChange}
          pageMapper={pageMapper}
        />
      </Container>
    </>
  );
};
