import { entities } from "../entities.ts";
import { Trigger } from "hass-lego";

export const motionDetectedInBedroom = new Trigger(
  "Motion detected in bedroom",
  entities.bedroom.motionSensor
);
