import { ServiceCall } from "hass-lego";

export const openCover = (coverId: string | string[]) => {
  return new ServiceCall({
    name: "Close cover",
    params: {
      domain: "cover",
      service: "open_cover",
      target: { entity_id: coverId },
    },
  });
};
