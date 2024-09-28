import { Action } from "hass-lego";

export const pauseMediaPlayer = (playerId: string | string[]) => {
  return new Action({
    name: "Pause media player",
    callback: async (client) => {
      await client.callService({
        domain: "media_player",
        service: "media_pause",
        target: { entity_id: playerId },
      });
    },
  });
};
