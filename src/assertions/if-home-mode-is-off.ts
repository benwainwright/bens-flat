import { entities } from "../entities.ts";
import { ifSwitchIsOff } from "./hass/if-switch-is-off.ts";

const { homeMode } = entities.switch;

export const ifHomeModeIsOff = ifSwitchIsOff(homeMode.id);
