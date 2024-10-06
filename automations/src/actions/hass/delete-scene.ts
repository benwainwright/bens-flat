import { Action, ServiceCall } from "hass-lego";

export const deleteScene = (sceneId: string | string[]) => {
  return new ServiceCall({
    name: "Delete scene",
    params: {
      domain: "media_player",
      service: "media_pause",
      target: { entity_id: sceneId },
    },
  });
};
