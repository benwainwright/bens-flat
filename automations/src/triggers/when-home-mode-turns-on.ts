import { Trigger } from "hass-lego";
import { entities } from "../entities.ts";

const { homeMode } = entities.switch;

export const whenHomeModeTurnsOn = new Trigger(
  "When home mode turns on",
  homeMode.id,
  (event) => {
    const { new_state, old_state } = event.hassEvent.data;
    return new_state?.state === "on" && old_state?.state !== "on";
  }
);
