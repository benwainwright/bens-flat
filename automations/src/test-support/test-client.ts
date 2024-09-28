import { LegoClient, EventBus } from "hass-lego";
import { initialiseClient, getConfig, IClient } from "homeassistant-typescript";

import {
  TEST_HASS_HOST,
  TEST_HASS_PORT,
  TEST_HASS_TOKEN,
} from "./test-hass-config.ts";

import { getConnection } from "@lib";

export const getTestClient = async (): Promise<{
  client: LegoClient;
  bus: EventBus;
  rawClient: IClient;
}> => {
  process.env["HASS_HOST"] = TEST_HASS_HOST;
  process.env["HASS_PORT"] = String(TEST_HASS_PORT);
  process.env["HASS_TOKEN"] = TEST_HASS_TOKEN;

  const config = getConfig();
  const hassClient = await initialiseClient(config);

  const bus = new EventBus();
  const client = await getConnection(bus);

  return { client, bus, rawClient: hassClient };
};
