import { Action } from "hass-lego";

export const turnOnScene = (sceneId: string | string[]) => {
  return new Action({
    name: "Turn on scene",
    callback: async (client) => {
      await client.callService({
        domain: "scene",
        service: "turn_on",
        target: { entity_id: sceneId },
      });
    },
  });
};
