import { entities } from "../entities.ts";
import { Trigger } from "../lib/trigger.ts";

export const motionDetectedInHallway = new Trigger(
  "Motion detected in hallway",
  entities.hallway.motionSensor
);
