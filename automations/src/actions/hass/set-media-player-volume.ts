import { Action } from "hass-lego";

export const mediaPlayerSetVolume = (
  playerId: string | string[],
  volume: number
) => {
  return new Action({
    name: "Play media player",
    callback: async (client) => {
      await client.callService({
        domain: "media_player",
        service: "volume_set",
        target: { entity_id: playerId },
        data: {
          volume_level: String(volume),
        },
      });
    },
  });
};
