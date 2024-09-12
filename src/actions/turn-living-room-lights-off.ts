import { switchLight } from "./hass/switch-light.ts";

export const turnLivingRoomLightsOff = switchLight(
  { area_id: "living_room" },
  "off"
);
