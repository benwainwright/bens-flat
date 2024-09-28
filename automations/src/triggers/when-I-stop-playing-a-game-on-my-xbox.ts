import { Trigger } from "hass-lego";
import { entities } from "../entities.ts";

const { xboxPlaying } = entities.binary_sensor;

export const whenIStopPlayingAGameOnMyXbox = new Trigger(
  "When I start playing a game on my XBOX",
  xboxPlaying.id,
  (event) => {
    const { new_state, old_state } = event.hassEvent.data;
    return new_state?.state === "off" && old_state?.state !== "off";
  }
);
