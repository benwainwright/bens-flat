import { entities } from "../entities.ts";
import { Trigger } from "../lib/trigger.ts";

export const motionDetectedInBedroom = new Trigger(
  "Motion detected in bedroom",
  entities.bedroom.motionSensor,
);
