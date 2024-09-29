import { io, Socket } from "socket.io-client";

export const getSocket = (url: string) => {
  return new Promise<Socket>((accept, reject) => {
    const socket = io(url);
    socket.once("connect", () => accept(socket));
    socket.once("connect_error", (error) => reject(error));
  });
};
