import { areas } from "../entities.ts";
import { switchLight } from "./hass/switch-light.ts";

export const turnLivingRoomLightsOn = switchLight(
  { area_id: areas.livingRoom },
  "on"
);
