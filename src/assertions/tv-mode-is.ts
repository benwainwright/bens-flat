import { entities } from "../entities.ts";
import { Assertion } from "../lib/assertion.ts";

export const tvModeIs = (state: string) =>
  new Assertion(`TV Mode is ${state}`, (client) => {
    const state = client.getState(entities.global.switch.tvMode);
    return state === state;
  });
