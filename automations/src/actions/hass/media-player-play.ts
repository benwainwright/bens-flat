import { ServiceCall } from "hass-lego";

export const playMediaPlayer = (
  mediaContentId: string,
  mediaContentType: string,
  playerId: string | string[],
) => {
  return new ServiceCall({
    name: "Play media player",
    params: {
      domain: "media_player",
      service: "play_media",
      target: { entity_id: playerId },
      service_data: {
        media_content_id: mediaContentId,
        media_content_type: mediaContentType,
      },
    },
  });
};
