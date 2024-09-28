import { Trigger } from "hass-lego";
import { entities } from "../entities.ts";

const { homeMode } = entities.switch;

export const whenHomeModeTurnsOff = new Trigger(
  "When home mode turns off",
  homeMode.id,
  (event) => {
    const { new_state, old_state } = event.hassEvent.data;
    return new_state?.state === "off" && old_state?.state !== "off";
  }
);
