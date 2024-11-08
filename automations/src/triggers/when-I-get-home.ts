import { Trigger } from "hass-lego";
import { entities } from "../entities.ts";

const { me } = entities.person;

export const whenIGetHome = new Trigger("When I get home", me.id, (event) => {
  const { new_state, old_state } = event.hassEvent.data;
  return new_state?.state === "home" && old_state?.state !== "home";
});
