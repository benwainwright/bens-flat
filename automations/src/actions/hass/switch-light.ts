import { ServiceCall } from "hass-lego";

interface Which {
  entity_id?: string;
  area_id?: string;
}

export const switchLight = (target: Which, onOrOff: "on" | "off") => {
  const service = onOrOff === "on" ? "turn_on" : "turn_off";
  return new ServiceCall({
    name: `Switch light ${onOrOff}`,
    params: {
      domain: "light",
      service,
      target,
    },
  });
};
