import { ServiceCall } from "hass-lego";

export const turnOffMediaPlayer = (entityId: string | string[]) => {
  return new ServiceCall({
    name: "Turn off media player",
    params: {
      domain: "media_player",
      service: "turn_off",
      target: {
        entity_id: entityId,
      },
    },
  });
};
