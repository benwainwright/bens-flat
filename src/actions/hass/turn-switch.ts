import { Action } from "hass-lego";

export const turnSwitchOn = (...switchId: string[]) => {
  return new Action({
    name: `Turn switch on`,
    callback: async (client) => {
      console.log(`Calling turn on for ${switchId}`);
      await client.callService("switch", "turn_on", { entity_id: switchId });
    },
  });
};

export const turnSwitchOff = (...switchId: string[]) => {
  return new Action({
    name: `Turn switch off`,
    callback: async (client) => {
      await client.callService("switch", "turn_off", { entity_id: switchId });
    },
  });
};
