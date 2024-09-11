import { Trigger } from "hass-lego";
import { entities } from "../entities.ts";

export const whenIStartPlayingAGameOnMyXBox = new Trigger(
  "When I start playing a game on my XBOX",
  entities.livingRoom.xbox,
  (event) => {
    const { new_state, old_state } = event.hassEvent.data;
    return new_state?.state === "on" && old_state?.state !== "on";
  }
);

export const whenIStopPlayingAGameOnMyXbox = new Trigger(
  "When I start playing a game on my XBOX",
  entities.livingRoom.xbox,
  (event) => {
    const { new_state, old_state } = event.hassEvent.data;
    return new_state?.state === "off" && old_state?.state !== "off";
  }
);
