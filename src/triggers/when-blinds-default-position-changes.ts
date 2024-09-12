import { Trigger } from "hass-lego";
import { entities } from "../entities.ts";

export const whenBlindsDefaultPositionChanges = new Trigger(
  "When blinds default position change",
  entities.global.switch.blindsDefaultPositionOpen
);
