import { entities } from "../entities.ts";
import { Trigger } from "hass-lego";

export const motionDetectedInHallway = new Trigger(
  "Motion detected in hallway",
  entities.hallway.motionSensor
);
