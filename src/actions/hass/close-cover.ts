import { Action } from "hass-lego";

export const closeCover = (...coverId: string[]) => {
  return new Action({
    name: "Close cover",
    callback: async (client) => {
      client.callService("cover", "close_cover", {
        entity_id: coverId,
      });
    },
  });
};

export const openCover = (...coverId: string[]) => {
  return new Action({
    name: "Open cover",
    callback: async (client) => {
      client.callService("cover", "open_cover", {
        entity_id: coverId,
      });
    },
  });
};
