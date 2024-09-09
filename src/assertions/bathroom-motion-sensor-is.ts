import { entities } from "../entities.ts";
import { Assertion } from "hass-lego";

export const bathroomMotionSensorIs = (state: string) =>
  new Assertion({
    name: `Bathroom motion sensor switch is ${state}`,
    predicate: (client) => {
      const switchState = client.getState(
        entities.global.switch.bathroomMotionSensor
      );
      return state === switchState;
    },
  });
