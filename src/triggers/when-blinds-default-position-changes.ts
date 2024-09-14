import { Trigger } from "hass-lego";
import { entities } from "../entities.ts";

const { blindsDefaultOpen } = entities.switch;

export const whenBlindsDefaultPositionChanges = new Trigger(
  "When blinds default position changes",
  blindsDefaultOpen.id
);
