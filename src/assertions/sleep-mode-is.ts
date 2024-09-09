import { entities } from "../entities.ts";
import { Assertion } from "../lib/assertion.ts";

export const sleepModeIs = (state: string) =>
  new Assertion(`Sleep mode is ${state}`, (client) => {
    const switchState = client.getState(entities.global.switch.sleepMode);
    return state === switchState;
  });
