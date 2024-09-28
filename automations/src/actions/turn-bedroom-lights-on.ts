import { areas } from "../entities.ts";
import { switchLight } from "./hass/switch-light.ts";

export const turnBedroomLightsOn = switchLight(
  { area_id: areas.bedroom },
  "on"
);
