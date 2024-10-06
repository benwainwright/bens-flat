import { Action, ServiceCall } from "hass-lego";

export const pauseMediaPlayer = (playerId: string | string[]) => {
  return new ServiceCall({
    name: "Pause media player",
    params: {
      domain: "media_player",
      service: "media_pause",
      target: { entity_id: playerId },
    },
  });
};
