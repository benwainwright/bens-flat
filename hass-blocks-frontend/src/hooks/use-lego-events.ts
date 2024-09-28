import { TransmittedHassLegoEvent } from "@/types/transmitted-hass-lego-event";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export enum ConnectionStatus {
  Connected = "Connected",
  NotConnected = "NotConnected",
}

const removeDupes = (events: TransmittedHassLegoEvent[]) => {
  const map = new Map<string, TransmittedHassLegoEvent>();

  events.forEach((event) => map.set(event.id, event));

  return Array.from(map.values())
    .slice()
    .sort((a, b) => (new Date(a.timestamp) > new Date(b.timestamp) ? 1 : -1));
};

export const useLegoEvents = () => {
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>(
    ConnectionStatus.NotConnected
  );

  const [log, setLog] = useState<TransmittedHassLegoEvent[]>([]);

  useEffect(() => {
    const socket = io(
      `ws://${process.env.NEXT_PUBLIC_LEGO_HOST}:${process.env.NEXT_PUBLIC_LEGO_PORT}`
    );

    socket.onAny(() => {
      setConnectionStatus(
        socket.connected
          ? ConnectionStatus.Connected
          : ConnectionStatus.NotConnected
      );
    });

    socket.on("error", (message) => console.log(message));

    socket.on("connect_error", (message) => {
      console.log(message);
    });

    socket.on("connect_failed", (message) => console.log(message));
    socket.on("disconnect", (message) => console.log(message));

    socket.on("hass-lego-event", (event: TransmittedHassLegoEvent) => {
      if (event.type !== "hass-state-changed") {
        setLog((oldLog) => [...oldLog, event]);
      }
    });
  }, []);

  return [removeDupes(log), connectionStatus] as const;
};
