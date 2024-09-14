import { Trigger } from "hass-lego";
import { entities } from "../entities.ts";

const { appleTv } = entities.media_player;

const appIds = {
  netflix: "com.netflix.Netflix",
  amazonPrime: "com.amazon.aiv.AIVApp",
  plex: "com.plexapp.plex",
};

export const whenIStartWatchingSomethingOnTheAppleTv = new Trigger(
  "When I start watching someting on the apple tv",
  appleTv.id,
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

    if (typeof attributes.app_id !== "string") {
      throw new Error("App ID was incorrect type");
    }

    if (Object.values(appIds).includes(attributes.app_id)) {
      return isChangeFromOffToOn;
    }

    return false;
  }
);
