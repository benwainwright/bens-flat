import { entities } from "../entities.ts";
import { Trigger } from "hass-lego";

export const motionDetectedInBathroom = new Trigger(
  "Motion detected in bathroom",
  entities.bathroom.motionSensor
);
