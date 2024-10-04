import { makeHassRequest } from "../utils/make-hass-request/make-hass-request";
import { io, Socket } from "socket.io-client";

const LEGO_NAME = "hass-blocks";

const getHassLegoSlug = async () => {
  const {
    data: { addons },
  } = await makeHassRequest("/addons");

  const lego = addons.find((addon) => addon.slug.endsWith(LEGO_NAME));

  return lego?.slug ?? "";
};

export const getHassBlocksSocket = async () => {
  const HASS_BLOCKS_HOST =
    process.env.IN_ADDON === "true"
      ? `addons_${await getHassLegoSlug()}`
      : "hass-blocks";

  return new Promise<Socket>((accept, reject) => {
    const url = `ws://${HASS_BLOCKS_HOST}:3001`;

    const socket = io(url);
    socket.once("connect", () => accept(socket));
    socket.once("connect_error", (error) => reject(error));
  });
};
