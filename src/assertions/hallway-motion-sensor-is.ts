import { entities } from "../entities.ts";
import { Assertion } from "../lib/assertion.ts";

export const hallwayMotionSensorIs = (state: string) =>
  new Assertion(`Hallway motion sensor switch is ${state}`, (client) => {
    const switchState = client.getState(
      entities.global.switch.hallwayMotionSensor
    );
    return state === switchState;
  });
