import { Action } from "hass-lego";
import { entities } from "../../entities.ts";

export const turnOffMediaPlayer = (entityId: string | string[]) => {
  return new Action({
    name: "Turn off media player",
    callback: async (client) => {
      await client.callService({
        domain: "media_player",
        service: "turn_off",
        target: {
          entity_id: entityId,
        },
      });
    },
  });
};
