import { Trigger } from "hass-lego";
import { entities } from "../entities.ts";

export const tvModeChangesStateTo = (state: "on" | "off") => {
  return new Trigger(
    `TV Mode changes ${state}`,
    entities.global.switch.tvMode,
    (event) => {
      const { new_state, old_state } = event.hassEvent.data;
      return old_state?.state !== state && new_state?.state === state;
    }
  );
};
