import { Action, ServiceCall } from "hass-lego";

export const turnSwitchOn = (switchId: string | string[]) => {
  return new ServiceCall({
    name: `Turn switch on`,
    params: {
      domain: "switch",
      service: "turn_on",
      target: { entity_id: switchId },
    },
  });
};

export const turnSwitchOff = (switchId: string | string[]) => {
  return new Action({
    name: `Turn switch off`,
    callback: async (client) => {
      await client.callService({
        domain: "switch",
        service: "turn_off",
        target: { entity_id: switchId },
      });
    },
  });
};
