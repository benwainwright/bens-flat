import { Trigger } from "hass-lego";
import { entities } from "../entities.ts";

export const whenBlindsDefaultPositionChanges = new Trigger(
  "When blinds default position changes",
  entities.global.switch.blindsDefaultPositionOpen
);
