import { entities } from "../entities.ts";
import { Assertion } from "../lib/assertion.ts";

export const bedroomMotionSensorIs = (state: string) =>
  new Assertion(`Bedroom motion sensor switch is ${state}`, (client) => {
    const switchState = client.getState(
      entities.global.switch.bedroomMotionSensor
    );
    return state === switchState;
  });