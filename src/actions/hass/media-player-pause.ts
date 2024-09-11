import { Action } from "hass-lego";

export const pauseMediaPlayer = (...playerId: string[]) => {
  return new Action({
    name: "Pause media player",
    callback: async (client) => {
      client.callService("media_player", "media_pause", {
        entity_id: playerId,
      });
    },
  });
};
