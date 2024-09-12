import { entities } from "../entities.ts";
import { Trigger } from "hass-lego";

export const motionDetectedInBathroom = new Trigger(
  "Motion detected in bathroom",
  entities.bathroom.motionSensor,
  (event) => {
    const { old_state, new_state } = event.hassEvent.data;
    return new_state?.state === "on" && old_state?.state !== "on";
  }
);
