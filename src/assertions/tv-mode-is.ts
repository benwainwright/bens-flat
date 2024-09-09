import { entities } from "../entities.ts";
import { Assertion } from "hass-lego";

export const tvModeIs = (state: string) =>
  new Assertion({
    name: `TV Mode is ${state}`,
    predicate: (client) => {
      const switchState = client.getState(entities.global.switch.tvMode);
      return state === switchState;
    },
  });
