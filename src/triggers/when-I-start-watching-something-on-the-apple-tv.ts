import { Trigger } from "hass-lego";
import { entities } from "../entities.ts";

const appIds = {
  netflix: "com.netflix.Netflix",
  amazonPrime: "com.amazon.aiv.AIVApp",
  plex: "com.plexapp.plex",
};

export const whenIStartWatchingSomethingOnTheAppleTv = new Trigger(
  "When I start watching someting on the apple tv",
  entities.livingRoom.appleTv,
  (event) => {
    const { old_state, new_state } = event.hassEvent.data;

    if (!old_state || !new_state) {
      return false;
    }

    const { attributes } = new_state;

    const isChangeFromOffToOn =
      new_state.state === "playing" && old_state.state !== "playing";

    if ("media_content_id" in attributes) {
      return isChangeFromOffToOn;
    }

    if (Object.values(appIds).includes(attributes.app_id)) {
      return isChangeFromOffToOn;
    }

    return false;
  }
);
