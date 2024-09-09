import { Action, LegoClient } from "hass-lego";

interface Which {
  entity_id?: string;
  area_id?: string;
}

const switchLight = async (
  client: LegoClient,
  onOrOff: "on" | "off",
  target: Which
) => {
  const action = onOrOff === "on" ? "turn_on" : "turn_off";

  await client.callService("light", action, target);
};

export const turnLivingRoomLightsOn = new Action(
  "Turn living room lights on",
  async (client) => {
    await switchLight(client, "on", { area_id: "living_room" });
  }
);

export const turnLivingRoomLightsOff = new Action(
  "Turn living room lights off",
  async (client) => {
    await switchLight(client, "off", { area_id: "living_room" });
  }
);

export const turnBedroomLightsOn = new Action(
  "Turn bedroomlights on",
  async (client) => {
    await switchLight(client, "on", { area_id: "bedroom" });
  }
);

export const turnBedroomLightsOff = new Action(
  "Turn bedroom lights off",
  async (client) => {
    await switchLight(client, "off", { area_id: "bedroom" });
  }
);

export const turnHallwayLightsOn = new Action(
  "Turn hallway lights on",
  async (client) => {
    await switchLight(client, "on", { area_id: "hallway" });
  }
);

export const turnHallwayLightsOff = new Action(
  "Turn hallway lights off",
  async (client) => {
    await switchLight(client, "off", { area_id: "hallway" });
  }
);

export const turnBathroomLightsOn = new Action(
  "Turn bathroom lights on",
  async (client) => {
    await switchLight(client, "on", { area_id: "bathroom" });
  }
);

export const turnBathroomLightsOff = new Action(
  "Turn bathroom lights off",
  async (client) => {
    await switchLight(client, "off", { area_id: "bathroom" });
  }
);
