import { entities } from "../entities.ts";
import { Trigger } from "hass-lego";

export const motionDetectedInLivingRoom = new Trigger(
  "Motion detected in living room",
  entities.livingRoom.motionSensor,
  (event) => {
    const { old_state, new_state } = event.hassEvent.data;
    return new_state?.state === "on" && old_state?.state !== "on";
  }
);
