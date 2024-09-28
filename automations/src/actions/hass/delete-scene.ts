import { Action } from "hass-lego";

export const deleteScene = (sceneId: string | string[]) => {
  return new Action({
    name: "Delete scene",
    callback: async (client) => {
      await client.callService({
        domain: "media_player",
        service: "media_pause",
        target: { entity_id: sceneId },
      });
    },
  });
};
