import { Action } from "hass-lego";

export const playMediaPlayer = (
  mediaContentId: string,
  mediaContentType: string,
  playerId: string | string[]
) => {
  return new Action({
    name: "Play media player",
    callback: async (client) => {
      await client.callService({
        domain: "media_player",
        service: "play_media",
        target: { entity_id: playerId },
        data: {
          media_content_id: mediaContentId,
          media_content_type: mediaContentType,
        },
      });
    },
  });
};
