import { entities } from "../entities.ts";
import { Trigger } from "../lib/trigger.ts";

export const motionDetectedInLivingRoom = new Trigger(
  "Motion detected in living room",
  entities.livingRoom.motionSensor,
);
