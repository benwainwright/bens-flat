import { io, Socket } from "socket.io-client";

const HASS_BLOCKS_HOST =
  process.env.IN_ADDON === "true" ? "addon_local_hass-blocks" : "hass-blocks";

export const getHassBlocksSocket = () => {
  return new Promise<Socket>((accept, reject) => {
    const url = `ws://${HASS_BLOCKS_HOST}:3001`;
    const socket = io(url);
    socket.once("connect", () => accept(socket));
    socket.once("connect_error", (error) => reject(error));
  });
};
