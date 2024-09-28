
import { Trigger } from "hass-lego";
import { entities } from "../entities.ts";

export const whenCoverCloses = (coverId: string) =>
  new Trigger(`When ${coverId} closes`, homeMode, (event) => {
    const { new_state, old_state } = event.hassEvent.data;
    return new_state?.state === "on" && old_state?.state !== "on";
  });
