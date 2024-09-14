import { areas } from "../entities.ts";
import { switchLight } from "./hass/switch-light.ts";

export const turnHallwayLightsOn = switchLight(
  { area_id: areas.hallway },
  "on"
);
