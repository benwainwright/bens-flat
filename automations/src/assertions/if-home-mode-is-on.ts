import { entities } from "../entities.ts";
import { ifSwitchIsOn } from "./hass/if-switch-is-on.ts";

const { homeMode } = entities.switch;

export const ifHomeModeIsOn = ifSwitchIsOn(homeMode.id);
