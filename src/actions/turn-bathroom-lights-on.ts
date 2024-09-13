import { switchLight } from "./hass/switch-light.ts";

export const turnBathroomLightsOn = switchLight(
  { area_id: "main_bathroom" },
  "on"
);
