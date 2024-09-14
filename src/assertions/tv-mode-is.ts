import { entities } from "../entities.ts";
import { Assertion } from "hass-lego";

const { tvMode } = entities.switch;

export const ifTvModeIs = (state: string) =>
  new Assertion({
    name: `If TV Mode is ${state}`,
    predicate: (client) => {
      const switchState = client.getState(tvMode.id);
      return state === switchState;
    },
  });
