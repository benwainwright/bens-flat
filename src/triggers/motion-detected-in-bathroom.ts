import { entities } from "../entities.ts";
import { Trigger } from "../lib/trigger.ts";

export const motionDetectedInBathroom = new Trigger(
  "Motion detected in bathroom",
  entities.bathroom.motionSensor
);
