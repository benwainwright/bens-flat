import { useExecutions } from "@/hooks/use-executions";
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import humanDate from "human-date";
import { StatusIcon } from "../status-icon/status-icon";

interface LogPageProps {
  page: number;
  pageSize: number;
  totalRowCount: number;
  triggerId?: string;
  onPaginationModelChange: (model: GridPaginationModel) => void;
}

export const LogPage = ({
  onPaginationModelChange,
  totalRowCount,
  page,
  pageSize,
  triggerId,
}: LogPageProps) => {
  const withTriggerId = triggerId ? { triggerId } : {};
  const { executions } = useExecutions({ page, pageSize, ...withTriggerId });
  const cols: GridColDef[] = [
    {
      field: "created",
      headerName: "Created",
      flex: 0.5,
    },
    {
      field: "updated",
      headerName: "Updated",
      flex: 0.5,
    },
    {
      field: "type",
      headerName: "Type",
      flex: 0.5,
    },
    {
      field: "status",
      headerName: "Status",
      renderCell: (props) => <StatusIcon status={props.value} />,
      flex: 0.5,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "triggerId",
      headerName: "Trigger ID",
      flex: 1,
    },
    {
      field: "continue",
      headerName: "Continue",
      flex: 0.5,
      type: "boolean",
    },
    {
      field: "output",
      headerName: "Output",
      flex: 0.5,
    },
    {
      field: "conditionResult",
      type: "boolean",
      headerName: "Result",
      flex: 0.5,
    },
  ];

  const rows = executions?.map((execution) => ({
    ...execution,
    name: execution.instanceOf.name,
    continue: execution.output?.continue ?? "",
    output: execution.output?.output,
    result: execution.output?.conditionResult,
    created: humanDate.relativeTime(execution.created),
    updated: humanDate.relativeTime(execution.updated),
  }));

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
