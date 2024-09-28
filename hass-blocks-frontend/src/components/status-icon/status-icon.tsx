import { FaCheck } from "react-icons/fa";
import { ClassicSpinner } from "react-spinners-kit";
import { BiError } from "react-icons/bi";

import { TbHandStop } from "react-icons/tb";
import { FaStop } from "react-icons/fa6";
import { ExecutedEvent } from "@/types/executed-event";

interface StatusIconProps {
  events: ExecutedEvent[];
}
export const StatusIcon = ({ events }: StatusIconProps) => {
  const allEvents = events.flatMap((item) => {
    return item;
  });
  const finished = Boolean(
    allEvents.find((item) => item.status === "finished")
  );

  const stopped = Boolean(
    events.find((item) => "continue" in item && item.continue === false)
  );
  const aborted = Boolean(allEvents.find((item) => item.status === "aborted"));

  const failed = Boolean(allEvents.find((item) => item.status === "failed"));

  if (failed) {
    return <BiError />;
  }

  if (aborted) {
    return <FaStop />;
  }

  if (stopped) {
    return <TbHandStop />;
  }

  if (!finished) {
    return <ClassicSpinner size={15} />;
  }

  return <FaCheck />;
};
