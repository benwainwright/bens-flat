import { entities } from "../entities.ts";
import { Assertion } from "hass-lego";

export const ifSleepModeIs = (state: string) =>
  new Assertion({
    name: `If sleep mode is ${state}`,
    predicate: (client) => {
      const switchState = client.getState(entities.global.switch.sleepMode);
      return state === switchState;
    },
  });
