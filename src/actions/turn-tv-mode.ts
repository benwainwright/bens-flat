import { entities } from "../entities.ts";
import { turnSwitchOff, turnSwitchOn } from "./hass/turn-switch.ts";

export const turnTvModeOn = turnSwitchOn(entities.global.switch.tvMode);
export const turnTvModeOff = turnSwitchOff(entities.global.switch.tvMode);
