import { Trigger } from "hass-lego";
import { entities } from "../entities.ts";

const { tvMode } = entities.switch;

export const whenTvModeSwitchesTo = (state: "on" | "off") => {
  return new Trigger(
    `When TV Mode switches to ${state}`,
    tvMode.id,
    (event) => {
      const { new_state, old_state } = event.hassEvent.data;
      return old_state?.state !== state && new_state?.state === state;
    }
  );
};
