import { ExecutionLog } from "@/components/execution-log/execution-log";
import { Typography } from "@mui/material";

interface LogParams {
  searchParams?: { triggerId?: string; pageSize?: string };
}

const Executions = ({ searchParams }: LogParams) => {
  return (
    <>
      <Typography variant="h4" component="h2" gutterBottom>
        Executions
      </Typography>
      <ExecutionLog
        triggerId={searchParams?.triggerId}
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
