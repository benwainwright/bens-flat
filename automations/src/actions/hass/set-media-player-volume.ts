import { ServiceCall } from "hass-lego";

export const mediaPlayerSetVolume = (
  playerId: string | string[],
  volume: number,
) => {
  return new ServiceCall({
    name: `Set media player volume to ${volume}`,
    params: {
      domain: "media_player",
      service: "volume_set",
      target: { entity_id: playerId },
      service_data: {
        volume_level: String(volume),
      },
    },
  });
};
