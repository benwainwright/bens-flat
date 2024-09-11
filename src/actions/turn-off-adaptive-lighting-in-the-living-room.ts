import { entities } from "../entities.ts";
import { turnSwitchOff } from "./hass/turn-switch.ts";

export const turnOffAdaptiveLightingInTheLivingRoom = turnSwitchOff(
  entities.livingRoom.adaptiveLighting
);
