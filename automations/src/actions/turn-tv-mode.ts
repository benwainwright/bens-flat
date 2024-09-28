import { entities } from "../entities.ts";
import { turnSwitchOff, turnSwitchOn } from "./hass/turn-switch.ts";

const { tvMode } = entities.switch;

export const turnTvModeOn = turnSwitchOn(tvMode.id);
export const turnTvModeOff = turnSwitchOff(tvMode.id);
