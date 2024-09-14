import { entities } from "../entities.ts";
import { Trigger } from "hass-lego";

const { livingRoomMotionSensor } = entities.binary_sensor;

export const whenMotionIsDetectedInTheLivingRoom = new Trigger(
  "Motion detected in living room",
  livingRoomMotionSensor.id,
  (event) => {
    const { old_state, new_state } = event.hassEvent.data;
    return new_state?.state === "on" && old_state?.state !== "on";
  }
);
