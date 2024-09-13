import { Trigger } from "hass-lego";
import { entities } from "../entities.ts";

export const whenBlindsDefaultPositionChangesToOpen = new Trigger(
  "When blinds default position changes to open",
  entities.global.switch.blindsDefaultPositionOpen,
  (event) => {
    const { new_state, old_state } = event.hassEvent.data;
    return new_state?.state === "on" && old_state?.state !== "on";
  }
);
