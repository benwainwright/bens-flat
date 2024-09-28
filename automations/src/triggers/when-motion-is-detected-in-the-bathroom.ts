import { entities } from "../entities.ts";
import { Trigger } from "hass-lego";

const { bathroomMotionSensor } = entities.binary_sensor;

export const whenMotionIsDetectedInTheBathroom = new Trigger(
  "When motion is detected in the bathroom",
  bathroomMotionSensor.id,
  (event) => {
    const { old_state, new_state } = event.hassEvent.data;
    return new_state?.state === "on" && old_state?.state !== "on";
  }
);
