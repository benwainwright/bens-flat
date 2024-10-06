import { ExecutionLog } from "@/components/execution-log/execution-log";
import { Typography } from "@mui/material";

interface LogParams {
  searchParams?: { triggerId?: string; pageSize?: string };
}

const Events = ({ searchParams }: LogParams) => {
  return (
    <>
      <Typography variant="h4" component="h2" gutterBottom>
        Events
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

export default Events;
