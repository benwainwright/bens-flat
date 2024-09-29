import { useEffect, useState } from "react";
import { useSocket } from "./use-socket";
import { ExecutedEvent } from "@/types/executed-event";
import { useData } from "./use-data";

const removeDupes = (events: ExecutedEvent[]) => {
  const map = new Map<string, ExecutedEvent>();

  events.forEach((event) => map.set(event.id, event));

  return Array.from(map.values())
    .slice()
    .sort((a, b) => (new Date(a.timestamp) > new Date(b.timestamp) ? 1 : -1));
};

export interface Execution {
  triggerName: string;
  parent: string;
  events: ExecutedEvent[];
}

export const useAutomations = () => {
  const { socket } = useSocket();
  const [automationNames, setAutomationNames] = useState<string[]>([]);
  const [executedEvents, addExecutedEvent] =
    useData<Execution["events"][number]>("executed-events");

  useEffect(() => {
    socket?.emit("request-automations");

    socket?.on("automations", (automations: string[]) => {
      console.log(automations);
      setAutomationNames(automations);
    });
  }, []);

  useEffect(() => {
    if (automationNames.length > 0) {
      socket?.on("hass-lego-event", (event: ExecutedEvent) => {
        if ("triggerId" in event && "name" in event) {
          console.log(event);
          addExecutedEvent(event);
        }
      });
    }
  }, [automationNames]);

  const triggers = Object.values(
    removeDupes(executedEvents).reduce<Record<string, ExecutedEvent[]>>(
      (accum, item) => {
        accum[item.triggerId] = [...(accum[item.triggerId] ?? []), item];
        return accum;
      },
      {},
    ),
  ).flatMap((events) => {
    const trigger = events.find((item) => item.type === "trigger");
    const automation = events.find((item) => item.type === "automation");
    return automation
      ? {
          triggerName: trigger?.name ?? "",
          parent: trigger && "parent" in trigger ? trigger?.parent?.name : "",
          events: events,
        }
      : [];
  });

  const automations = automationNames.map((name) => {
    return {
      name,
      executions: triggers.filter((trigger) => trigger.parent === name),
    };
  });

  return { automations };
};
