import { Trigger } from "hass-lego";
import { entities } from "../entities.ts";

export const whenIGoOut = new Trigger(
  "When I go out",
  entities.global.person.me,
  (event) => {
    const { new_state, old_state } = event.hassEvent.data;
    return old_state?.state === "home" && new_state?.state !== "home";
  }
);
