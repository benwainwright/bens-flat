import { entities } from "../entities.ts";
import { ifSwitchIsOff } from "./hass/if-switch-is-off.ts";

const { blindsDefaultOpen } = entities.switch;

export const ifBlindsDefaultPositionIsSetToClosed = ifSwitchIsOff(
  blindsDefaultOpen.id
);
