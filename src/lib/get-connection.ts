import { createConnection } from "home-assistant-js-websocket";

import hass from "homeassistant-ws";
const hassWs = hass as unknown as typeof hass.default;

import { getConfig } from "./get-config.ts";
import { Client } from "./client.ts";
import { SimpleLogger } from "./logger.ts";
export const getConnection = async () => {
  try {
    const config = getConfig();

    const api = await hassWs({
      token: config.token,
      protocol: "ws",
      host: config.host,
      port: config.port,
      path: config.websocketPath,
    });

    const client = new Client(api, new SimpleLogger());
    await client.init();
    return client;
  } catch (error) {
    console.log(error);
  }
};
