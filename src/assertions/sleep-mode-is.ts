import { entities } from "../entities.ts";
import { Assertion } from "hass-lego";

const { sleepMode } = entities.switch;

export const ifSleepModeIs = (state: string) =>
  new Assertion({
    name: `If sleep mode is ${state}`,
    predicate: (client) => {
      const switchState = client.getState(sleepMode.id);
      return state === switchState;
    },
  });
