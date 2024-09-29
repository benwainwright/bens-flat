import { TransmittedHassLegoEvent } from "@/types/transmitted-hass-lego-event";
import { useEffect, useState } from "react";
import { useSocket } from "./use-socket";

const removeDupes = (events: TransmittedHassLegoEvent[]) => {
  const map = new Map<string, TransmittedHassLegoEvent>();

  events.forEach((event) => map.set(event.id, event));

  return Array.from(map.values())
    .slice()
    .sort((a, b) => (new Date(a.timestamp) > new Date(b.timestamp) ? 1 : -1));
};

export const useLegoEvents = () => {
  const { connectionStatus, socket } = useSocket();

  const [log, setLog] = useState<TransmittedHassLegoEvent[]>([]);

  useEffect(() => {
    socket?.on("hass-lego-event", (event: TransmittedHassLegoEvent) => {
      if (event.type !== "hass-state-changed") {
        setLog((oldLog) => [...oldLog, event]);
      }
    });
  }, []);

  return [removeDupes(log), connectionStatus] as const;
};
