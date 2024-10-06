"use client";

import humanDate from "human-date";
import { Log } from "../log/log";
import { GridColDef } from "@mui/x-data-grid";
import { Execution } from "@/hooks/use-executions";

interface ExecutionLogProps<T> {
  triggerId?: string;
  page?: number;
  pageSize?: number;
}

export const ExecutionLog = <T,>({
  triggerId,
  page,
  pageSize,
}: ExecutionLogProps<T>) => {
  const pageMapper = (execution: Execution) => ({
    ...execution,
    name: execution.instanceOf.name,
    continue: execution.output?.continue ?? "",
    output: execution.output?.output,
    result: execution.output?.conditionResult,
    outputType: execution.output?.outputType,
    created: humanDate.relativeTime(execution.created),
    updated: humanDate.relativeTime(execution.updated),
  });

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
      field: "result",
      type: "boolean",
      headerName: "Result",
      flex: 0.5,
    },
    {
      field: "output",
      headerName: "Output",
      flex: 0.5,
    },
    {
      field: "outputType",
      headerName: "Output Type",
      flex: 0.5,
    },
  ];

  return (
    <Log
      triggerId={triggerId}
      api="api/executions"
      countApi="api/executions/count"
      initialPage={page}
      initialPageSize={pageSize}
      gridColumns={cols}
      pageMapper={pageMapper}
    />
  );
};
