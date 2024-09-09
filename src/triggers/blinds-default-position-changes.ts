import { Trigger } from "hass-lego";
import { entities } from "../entities.ts";

export const blindsDefaultPositionHasChanged = new Trigger(
  "Blinds default position has changed",
  entities.global.switch.blindsDefaultPositionOpen
);
