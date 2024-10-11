import { LegoClient, EventBus } from "hass-lego";
import { initialiseClient, getConfig } from "homeassistant-typescript";

export const getConnection = async (bus: EventBus): Promise<LegoClient> => {
  const config = getConfig();

  const client = await initialiseClient(config);
  const lego = new LegoClient(client, bus);
  await lego.loadStates();
  return lego;
};
