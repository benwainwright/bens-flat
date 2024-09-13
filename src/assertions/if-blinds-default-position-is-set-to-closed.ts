import { entities } from "../entities.ts";
import { ifSwitchIsOff } from "./hass/if-switch-is-off.ts";

export const ifBlindsDefaultPositionIsSetToClosed = ifSwitchIsOff(
  entities.global.switch.blindsDefaultPositionOpen
);
