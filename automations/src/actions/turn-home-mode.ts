import { entities } from "../entities.ts";
import { turnSwitchOff, turnSwitchOn } from "./hass/turn-switch.ts";

const { homeMode } = entities.switch;

export const turnHomeModeOn = turnSwitchOn(homeMode.id);
export const turnHomeModeOff = turnSwitchOff(homeMode.id);
