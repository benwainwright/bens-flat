import { IClient } from "homeassistant-typescript";
import { registerAllAutomations } from "../automations/register-all.ts";
import { getTestClient } from "./test-client.ts";
import { EventBus, LegoClient } from "hass-lego";
import { assignAreas } from "./assign-areas.ts";
import { setupMatchers } from "./setup-matchers.ts";

declare global {
  var rawClient: IClient;
  var client: LegoClient;
  var bus: EventBus;
}

const { client, rawClient, bus } = await getTestClient();

await assignAreas(rawClient);

registerAllAutomations(client);

bus.subscribe((event) => {
  if (
    "status" in event &&
    (event.status === "error" || event.status === "failed")
  ) {
    console.log(event.error);
  }
});

globalThis.rawClient = rawClient;
globalThis.bus = bus;
globalThis.client = client;

setupMatchers();
