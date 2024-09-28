import { Assertion } from "hass-lego";

export const ifSwitchIsOn = (entityId: string) => {
  return new Assertion({
    name: `If ${entityId} is on`,
    predicate: async (client) => {
      return client.getState(entityId) === "on";
    },
  });
};
