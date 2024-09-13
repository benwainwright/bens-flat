import { Trigger } from "hass-lego";
import { entities } from "../entities.ts";

export const whenHomeModeTurnsOn = new Trigger(
  "When home mode turns on",
  entities.global.switch.homeMode,
  (event) => {
    const { new_state, old_state } = event.hassEvent.data;
    return new_state?.state === "on" && old_state?.state !== "on";
  }
);
