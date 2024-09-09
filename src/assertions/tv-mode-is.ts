import { entities } from "../entities.ts";
import { Assertion } from "../lib/assertion.ts";

export const tvModeIs = (state: string) =>
  new Assertion(`TV Mode is ${state}`, (client) => {
    const switchState = client.getState(entities.global.switch.tvMode);
    return state === switchState;
  });
