import { Action } from "hass-lego";

export const openCover = (coverId: string | string[]) => {
  return new Action({
    name: "Open cover",
    callback: async (client) => {
      await client.callService({
        domain: "cover",
        service: "open_cover",
        target: { entity_id: coverId },
      });
    },
  });
};
