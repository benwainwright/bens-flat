import { entities } from "../entities.ts";
import { ifSwitchIsOff } from "./hass/if-switch-is-off.ts";

export const ifHomeModeIsOff = ifSwitchIsOff(entities.global.switch.homeMode);
