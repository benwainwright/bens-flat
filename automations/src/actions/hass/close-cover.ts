import { Action, ServiceCall } from "hass-lego";

export const closeCover = (coverId: string | string[]) => {
  return new ServiceCall({
    name: "Close cover",
    params: {
      domain: "cover",
      service: "close_cover",
      target: { entity_id: coverId },
    },
  });
};
