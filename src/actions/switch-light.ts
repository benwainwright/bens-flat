import { Action } from "../lib/action.ts";
import { Client } from "../lib/client.ts";

interface Which {
  entity_id?: string;
  area_id?: string;
}

const switchLight = async (
  client: Client,
  onOrOff: "on" | "off",
  target: Which,
) => {
  const action = onOrOff === "on" ? "turn_on" : "turn_off";

  await client.callService("light", action, target);
};

export const turnLivingRoomLightsOn = new Action(
  "Turn living room lights on",
  async (client) => {
    await switchLight(client, "on", { area_id: "living_room" });
  },
);

export const turnLivingRoomLightsOff = new Action(
  "Turn living room lights off",
  async (client) => {
    await switchLight(client, "off", { area_id: "living_room" });
  },
);

export const turnBedroomLightsOn = new Action(
  "Turn bedroomlights on",
  async (client) => {
    await switchLight(client, "on", { area_id: "bedroom" });
  },
);

export const turnBedroomLightsOff = new Action(
  "Turn bedroom lig0hts off",
  async (client) => {
    await switchLight(client, "off", { area_id: "bedroom" });
  },
);
