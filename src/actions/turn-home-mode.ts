import { entities } from "../entities.ts";
import { turnSwitchOff, turnSwitchOn } from "./hass/turn-switch.ts";

export const turnHomeModeOn = turnSwitchOn(entities.global.switch.homeMode);
export const turnHomeModeOff = turnSwitchOff(entities.global.switch.homeMode);
