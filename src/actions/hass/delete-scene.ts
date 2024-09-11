import { Action } from "hass-lego";

export const deleteScene = (sceneId: string) => {
  return new Action({
    name: "Delete scene",
    callback: async (client) => {
      await client.callService("scene", "delete", {
        entity_id: sceneId,
      });
    },
  });
};
