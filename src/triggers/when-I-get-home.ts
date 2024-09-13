import { Trigger } from "hass-lego";
import { entities } from "../entities.ts";

export const whenIGetHome = new Trigger(
  "When I get home",
  entities.global.person.me,
  (event) => {
    const { new_state, old_state } = event.hassEvent.data;
    return new_state?.state === "home" && old_state?.state !== "home";
  }
);
