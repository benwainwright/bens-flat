import { areas } from "../entities.ts";
import { switchLight } from "./hass/switch-light.ts";

export const turnBathroomLightsOn = switchLight(
  { area_id: areas.bathroom },
  "on"
);
