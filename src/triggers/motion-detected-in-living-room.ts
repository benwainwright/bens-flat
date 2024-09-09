import { entities } from "../entities.ts";
import { Trigger } from "hass-lego";

export const motionDetectedInLivingRoom = new Trigger(
  "Motion detected in living room",
  entities.livingRoom.motionSensor
);
