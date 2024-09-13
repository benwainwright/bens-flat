import { entities } from "../entities.ts";
import { ifSwitchIsOn } from "./hass/if-switch-is-on.ts";

export const ifBlindsDefaultPositionIsSetToOpen = ifSwitchIsOn(
  entities.global.switch.blindsDefaultPositionOpen
);
