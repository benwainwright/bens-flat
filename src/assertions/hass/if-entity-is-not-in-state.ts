import { Assertion } from "hass-lego";

export const ifEntityIsNotInState = (entityId: string, state: string) => {
  return new Assertion({
    name: `If ${entityId} is not state ${state}`,
    predicate: async (client) => {
      return client.getState(entityId) !== state;
    },
  });
};
