import { switchLight } from "./hass/switch-light.ts";

export const turnLivingRoomLightsOn = switchLight(
  { area_id: "living_room" },
  "on"
);
