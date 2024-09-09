import { entities } from "../entities.ts";
import { Assertion } from "hass-lego";

export const sleepModeIs = (state: string) =>
  new Assertion({
    name: `Sleep mode is ${state}`,
    predicate: (client) => {
      const switchState = client.getState(entities.global.switch.sleepMode);
      return state === switchState;
    },
  });
