import { entities } from "../entities.ts";
import { turnSwitchOff } from "./hass/turn-switch.ts";

const { livingRoomAdaptiveLighting } = entities.switch;

export const turnOffAdaptiveLightingInTheLivingRoom = turnSwitchOff(
  livingRoomAdaptiveLighting.id
);
