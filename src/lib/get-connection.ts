import hass from "homeassistant-ws";
import { LegoClient, EventBus } from "hass-lego";
import { initialiseClient, getConfig } from "homeassistant-typescript";
const hassWs = hass as unknown as typeof hass.default;

export const getConnection = async (bus: EventBus): Promise<LegoClient> => {
  const config = getConfig();
  const client = await initialiseClient(config);
  const lego = new LegoClient(client, bus);
  await lego.loadStates();
  return lego;
};
