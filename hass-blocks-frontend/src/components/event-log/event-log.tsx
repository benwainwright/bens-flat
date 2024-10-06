"use client";

import humanDate from "human-date";
import { Log } from "../log/log";
import { GridColDef } from "@mui/x-data-grid";
import { Event } from "@/hooks/use-events";

interface EventLogProps {
  triggerId?: string;
  page?: number;
  pageSize?: number;
}

export const EventLog = ({ triggerId, page, pageSize }: EventLogProps) => {
  const pageMapper = (execution: Event) => ({
    ...execution,
    name: execution.instanceOf.name,
    continue: execution.output?.continue ?? "",
    output: execution.output?.output,
    result: execution.output?.conditionResult,
    outputType: execution.output?.outputType,
    created: humanDate.relativeTime(execution.created),
  });

  const cols: GridColDef[] = [
    {
      field: "created",
      headerName: "Created",
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
      field: "executionId",
      headerName: "Execution ID",
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
      api="api/events"
      countApi="api/events/count"
      initialPage={page}
      initialPageSize={pageSize}
      gridColumns={cols}
      pageMapper={pageMapper}
    />
  );
};
