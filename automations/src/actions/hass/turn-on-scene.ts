import { Action, ServiceCall } from "hass-lego";

export const turnOnScene = (sceneId: string | string[]) => {
  return new ServiceCall({
    name: "Turn on scene",
    params: {
      domain: "scene",
      service: "turn_on",
      target: { entity_id: sceneId },
    },
  });
};
