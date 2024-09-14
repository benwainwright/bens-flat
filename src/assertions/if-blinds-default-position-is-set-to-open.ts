import { entities } from "../entities.ts";
import { ifSwitchIsOn } from "./hass/if-switch-is-on.ts";

const { blindsDefaultOpen } = entities.switch;

export const ifBlindsDefaultPositionIsSetToOpen = ifSwitchIsOn(
  blindsDefaultOpen.id
);
