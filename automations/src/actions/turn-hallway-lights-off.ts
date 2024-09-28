import { areas } from "../entities.ts";
import { switchLight } from "./hass/switch-light.ts";

export const turnHallwayLightsOff = switchLight(
  { area_id: areas.hallway },
  "off"
);
