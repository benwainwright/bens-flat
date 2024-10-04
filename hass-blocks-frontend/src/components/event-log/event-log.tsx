"use client";

import { useState } from "react";
import { GridPaginationModel } from "@mui/x-data-grid";
import Container from "@mui/material/Container";

import { Typography } from "@mui/material";
import { LogPage } from "../log-page/log-page";
import { useExecutionsCount } from "@/hooks/use-executions-count";

interface EventLogProps {
  triggerId?: string;
  page?: number;
  pageSize?: number;
}

export const EventLog = ({
  triggerId,
  page: inputPage,
  pageSize: inputPageSize,
}: EventLogProps) => {
  const [page, setPage] = useState(inputPage ?? 0);
  const [pageSize, setPageSize] = useState(inputPageSize ?? 10);
  const { count } = useExecutionsCount({ keepPreviousData: true });

  const onPaginationModelChange = (model: GridPaginationModel) => {
    setPage(model.page);
    setPageSize(model.pageSize);
  };

  return (
    <>
      <Typography variant="h4" component="h2" gutterBottom>
        Log
      </Typography>
      <Container sx={{ padding: "1rem" }}>
        <LogPage
          page={page}
          pageSize={pageSize}
          triggerId={triggerId}
          totalRowCount={count ?? 0}
          onPaginationModelChange={onPaginationModelChange}
        />
      </Container>
    </>
  );
};
