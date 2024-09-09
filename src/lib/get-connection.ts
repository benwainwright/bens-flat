import hass from "homeassistant-ws";
import { LegoClient, EventBus } from "hass-lego";
const hassWs = hass as unknown as typeof hass.default;

import { getConfig } from "./get-config.ts";
export const getConnection = async (bus: EventBus) => {
  try {
    const config = getConfig();

    const api = await hassWs({
      token: config.token,
      protocol: "ws",
      host: config.host,
      port: config.port,
      path: config.websocketPath,
    });
    const client = new LegoClient(api, bus);
    await client.init();
    return client;
  } catch (error) {
    console.log(error);
  }
};
