import { entities } from "../entities.ts";
import { ifSwitchIsOn } from "./hass/if-switch-is-on.ts";

export const ifHomeModeIsOn = ifSwitchIsOn(entities.global.switch.homeMode);
