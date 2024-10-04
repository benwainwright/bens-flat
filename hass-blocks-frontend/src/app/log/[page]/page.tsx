import { EventLog } from "@/components/event-log/event-log";

interface LogParams {
  searchParams?: { triggerId?: string; pageSize?: string };
  params: { page: string };
}

const Log = ({ searchParams, params }: LogParams) => {
  return (
    <EventLog
      triggerId={searchParams?.triggerId}
      pageSize={
        searchParams?.pageSize
          ? parseInt(searchParams?.pageSize, 10)
          : undefined
      }
      page={parseInt(params.page, 10)}
    />
  );
};

export default Log;
