import { Assertion } from "hass-lego";

export const ifSwitchIsOff = (entityId: string) => {
  return new Assertion({
    name: `If ${entityId} is off`,
    predicate: async (client) => {
      return client.getState(entityId) === "off";
    },
  });
};
