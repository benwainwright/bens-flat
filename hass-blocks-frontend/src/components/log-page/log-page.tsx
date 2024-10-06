import { useDataFetcher } from "@/hooks/use-data-fetcher";
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import { Route } from "next";

interface LogPageProps<T> {
  page: number;
  pageSize: number;
  totalRowCount: number;
  triggerId?: string;
  api: Route;
  onPaginationModelChange: (model: GridPaginationModel) => void;
  cols: GridColDef[];
  pageMapper: (item: T) => Record<string, unknown>;
}

export const LogPage = <T,>({
  onPaginationModelChange,
  totalRowCount,
  page,
  pageSize,
  triggerId,
  cols,
  api,
  pageMapper,
}: LogPageProps<T>) => {
  const withTriggerId = triggerId ? { triggerId } : {};
  const { data } = useDataFetcher<T[]>(api, {
    page,
    pageSize,
    ...withTriggerId,
  });

  const rows = data?.map(pageMapper);

  return (
    <DataGrid
      paginationModel={{ page, pageSize }}
      onPaginationModelChange={onPaginationModelChange}
      columns={cols}
      rows={rows}
      rowCount={totalRowCount}
      paginationMode="server"
    />
  );
};
