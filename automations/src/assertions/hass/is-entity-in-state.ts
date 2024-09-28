import { Assertion } from "hass-lego";

export const isEntityInState = (entityId: string, state: string) => {
  return new Assertion({
    name: `If ${entityId} is in state ${state}`,
    predicate: async (client) => {
      return client.getState(entityId) === state;
    },
  });
};
