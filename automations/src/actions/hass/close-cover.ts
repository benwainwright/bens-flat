import { Action } from "hass-lego";

export const closeCover = (coverId: string | string[]) => {
  return new Action({
    name: "Close cover",
    callback: async (client) => {
      await client.callService({
        domain: "cover",
        service: "close_cover",
        target: { entity_id: coverId },
      });
    },
  });
};
