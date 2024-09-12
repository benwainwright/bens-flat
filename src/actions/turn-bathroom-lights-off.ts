import { switchLight } from "./hass/switch-light.ts";

export const turnBathroomLightsOff = switchLight(
  { area_id: "bathroom" },
  "off"
);
