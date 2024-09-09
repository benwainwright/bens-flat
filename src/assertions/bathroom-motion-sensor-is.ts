import { entities } from "../entities.ts";
import { Assertion } from "../lib/assertion.ts";

export const bathroomMotionSensorIs = (state: string) =>
  new Assertion(`Bathroom motion sensor switch is ${state}`, (client) => {
    const switchState = client.getState(
      entities.global.switch.bathroomMotionSensor
    );
    return state === switchState;
  });
