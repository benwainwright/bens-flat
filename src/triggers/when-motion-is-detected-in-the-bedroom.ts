import { entities } from "../entities.ts";
import { Trigger } from "hass-lego";

export const whenMotionIsDetectedInBedroom = new Trigger(
  "When motion is detected in the bedroom",
  entities.bedroom.motionSensor,
  (event) => {
    const { old_state, new_state } = event.hassEvent.data;
    return new_state?.state === "on" && old_state?.state !== "on";
  }
);
