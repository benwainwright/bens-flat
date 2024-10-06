import { EventLog } from "@/components/event-log/event-log";
import { ExecutionLog } from "@/components/execution-log/execution-log";
import { Typography } from "@mui/material";

interface LogParams {
  searchParams?: { triggerId?: string; pageSize?: string };
  params: { page: number };
}

const Executions = ({ searchParams, params: { page } }: LogParams) => {
  return (
    <>
      <Typography variant="h4" component="h2" gutterBottom>
        Executions
      </Typography>
      <ExecutionLog
        triggerId={searchParams?.triggerId}
        page={page}
        pageSize={
          searchParams?.pageSize
            ? parseInt(searchParams?.pageSize, 10)
            : undefined
        }
      />
    </>
  );
};

export default Executions;
