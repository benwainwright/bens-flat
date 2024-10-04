import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

export enum ConnectionStatus {
  Connected = "Connected",
  NotConnected = "NotConnected",
}

let socket: Socket | undefined;

export const useSocket = () => {
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>(
    ConnectionStatus.NotConnected,
  );

  const [errors, setErrors] = useState<Error[]>([]);

  useEffect(() => {
    if (!socket) {
      socket = io(
        `ws://${window.location.hostname}:${process.env.NEXT_PUBLIC_LEGO_PORT}`,
      );
      return;
    }

    socket.onAny(() => {
      setConnectionStatus(
        socket?.connected
          ? ConnectionStatus.Connected
          : ConnectionStatus.NotConnected,
      );
    });

    socket.on("error", (message) => {});

    socket.on("connect_error", (error) => {
      setErrors((oldErrors) => [...oldErrors, error]);
    });

    socket.on("connect_failed", (message) => console.log(message));

    socket.on("disconnect", (message) => console.log(message));
  }, [socket]);

  return { connectionStatus, errors, socket };
};
