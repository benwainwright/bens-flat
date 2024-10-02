"use client";

import TableBody from "@mui/material/TableBody";
import humanDate from "human-date";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { useExecutions } from "@/hooks/use-executions";

interface LogPageProps {
  page: number;
  pageSize: number;
}

export const LogPage = ({ page, pageSize }: LogPageProps) => {
  const { executions } = useExecutions({ page, pageSize });
  return (
    <>
      {executions?.map((event) => (
        <TableRow key={`${"id" in event && event.id}-log-row`}>
          <TableCell>{event.type}</TableCell>
          <TableCell>{event.status}</TableCell>
          <TableCell>{event.instanceOf.name}</TableCell>
          <TableCell>{humanDate.relativeTime(event.created)}</TableCell>
          <TableCell>{humanDate.relativeTime(event.created)}</TableCell>
        </TableRow>
      ))}
    </>
  );
};
