import { EventLog } from "@/components/event-log/event-log";
import { Typography } from "@mui/material";

interface LogParams {
  searchParams?: { triggerId?: string; pageSize?: string };
  params: { page: number };
}

const Events = ({ searchParams }: LogParams) => {
  return (
    <>
      <Typography variant="h4" component="h2" gutterBottom>
        Events
      </Typography>
      <EventLog
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
