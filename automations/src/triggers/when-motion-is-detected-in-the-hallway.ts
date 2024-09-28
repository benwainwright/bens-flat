import { entities } from "../entities.ts";
import { Trigger } from "hass-lego";

const { hallwayMotionSensor } = entities.binary_sensor;

export const whenMotionIsDetectedInTheHallway = new Trigger(
  "When motion is detected in the hallway",
  hallwayMotionSensor.id,
  (event) => {
    const { old_state, new_state } = event.hassEvent.data;
    return new_state?.state === "on" && old_state?.state !== "on";
  }
);
