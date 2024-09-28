import { Trigger } from "hass-lego";
import { entities } from "../entities.ts";

const { appleTv } = entities.media_player;

export const whenIStopWatchingSomethingOnTheAppleTv = new Trigger(
  "When I stop watching someting on the apple tv",
  appleTv.id,
  (event) => {
    const { old_state, new_state } = event.hassEvent.data;

    if (!old_state || !new_state) {
      return false;
    }

    return new_state.state !== "playing" && old_state.state === "playing";
  }
);
