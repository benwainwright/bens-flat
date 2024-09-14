import { areas } from "../entities.ts";
import { switchLight } from "./hass/switch-light.ts";

export const turnLivingRoomLightsOff = switchLight(
  { area_id: areas.livingRoom },
  "off"
);
