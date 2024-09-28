import { areas } from "../entities.ts";
import { switchLight } from "./hass/switch-light.ts";

export const turnBathroomLightsOff = switchLight(
  { area_id: areas.bathroom },
  "off"
);
