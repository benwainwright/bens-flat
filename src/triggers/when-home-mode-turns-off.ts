import { Trigger } from "hass-lego";
import { entities } from "../entities.ts";

export const whenHomeModeTurnsOff = new Trigger(
  "When home mode turns off",
  entities.global.switch.homeMode,
  (event) => {
    const { new_state, old_state } = event.hassEvent.data;
    return new_state?.state === "off" && old_state?.state !== "off";
  }
);
