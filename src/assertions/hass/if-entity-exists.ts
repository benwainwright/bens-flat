import { Assertion, EntityDoesNotExistError } from "hass-lego";

export const ifEntityExists = (entityId: string) => {
  return new Assertion({
    name: `If ${entityId} exists`,
    predicate: async (client) => {
      try {
        await client.loadStates();
        client.getEntity(entityId);
        return true;
      } catch (error) {
        if (error instanceof EntityDoesNotExistError) {
          return false;
        }
        throw error;
      }
    },
  });
};
