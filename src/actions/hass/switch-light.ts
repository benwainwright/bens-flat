import { Action, LegoClient } from "hass-lego";

interface Which {
  entity_id?: string;
  area_id?: string;
}

export const switchLight = (target: Which, onOrOff: "on" | "off") => {
  return new Action({
    name: `Switch light ${onOrOff}`,
    callback: async (client) => {
      const action = onOrOff === "on" ? "turn_on" : "turn_off";

      const args = {
        ...target,
      };

      await client.callService("light", action, args);
    },
  });
};
