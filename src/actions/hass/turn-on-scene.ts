import { Action } from "hass-lego";

export const turnOnScene = (sceneId: string) => {
  return new Action({
    name: "Turn on scene",
    callback: async (client) => {
      await client.callService("scene", "turn_on", {
        entity_id: sceneId,
      });
    },
  });
};
