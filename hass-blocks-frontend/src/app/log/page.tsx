import { EventLog } from "@/components/event-log/event-log";

interface LogParams {
  searchParams?: { triggerId?: string; pageSize?: string };
}

const Log = ({ searchParams }: LogParams) => {
  return (
    <EventLog
      triggerId={searchParams?.triggerId}
      pageSize={
        searchParams?.pageSize
          ? parseInt(searchParams?.pageSize, 10)
          : undefined
      }
    />
  );
};

export default Log;
