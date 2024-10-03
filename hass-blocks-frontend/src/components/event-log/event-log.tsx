"use client";

import { useState } from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import Table from "@mui/material/Table";
import { TableBody, TableHead, Typography } from "@mui/material";
import { LogPage } from "../log-page/log-page";
import { useExecutionsCount } from "@/hooks/use-executions-count";

export const EventLog = () => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const { count } = useExecutionsCount({ keepPreviousData: true });

  return (
    <>
      <Typography variant="h4" component="h2" gutterBottom>
        Log
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Type</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Created</TableCell>
              <TableCell>Updated</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <LogPage page={page} pageSize={pageSize} />
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={count ?? 0}
          page={page}
          onPageChange={(event, newPage) => setPage(newPage)}
          rowsPerPage={pageSize}
          onRowsPerPageChange={(event) => {
            setPageSize(parseInt(event.target.value, 10));
            setPage(0);
          }}
        />
      </TableContainer>
    </>
  );
};
