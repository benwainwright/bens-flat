import { areas } from "../entities.ts";
import { switchLight } from "./hass/switch-light.ts";

export const turnBedroomLightsOff = switchLight(
  { area_id: areas.bathroom },
  "off"
);
