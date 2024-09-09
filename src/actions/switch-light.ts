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

export const turnLivingRoomLightsOn = new Action({
  name: "Turn living room lights on",
  callback: async (client) => {
    await switchLight(client, "on", { area_id: "living_room" });
  },
});

export const turnLivingRoomLightsOff = new Action({
  name: "Turn living room lights off",
  callback: async (client) => {
    await switchLight(client, "off", { area_id: "living_room" });
  },
});

export const turnBedroomLightsOn = new Action({
  name: "Turn bedroomlights on",
  callback: async (client) => {
    await switchLight(client, "on", { area_id: "bedroom" });
  },
});

export const turnBedroomLightsOff = new Action({
  name: "Turn bedroom lights off",
  callback: async (client) => {
    await switchLight(client, "off", { area_id: "bedroom" });
  },
});

export const turnHallwayLightsOn = new Action({
  name: "Turn hallway lights on",
  callback: async (client) => {
    await switchLight(client, "on", { area_id: "hallway" });
  },
});

export const turnHallwayLightsOff = new Action({
  name: "Turn hallway lights off",
  callback: async (client) => {
    await switchLight(client, "off", { area_id: "hallway" });
  },
});

export const turnBathroomLightsOn = new Action({
  name: "Turn bathroom lights on",
  callback: async (client) => {
    await switchLight(client, "on", { area_id: "bathroom" });
  },
});

export const turnBathroomLightsOff = new Action({
  name: "Turn bathroom lights off",
  callback: async (client) => {
    await switchLight(client, "off", { area_id: "bathroom" });
  },
});
