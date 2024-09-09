import { entities } from "../entities.ts";
import { Assertion } from "../lib/assertion.ts";

export const livingRoomMotionSensorIs = (state: string) =>
  new Assertion(`Living room motion sensor switch is ${state}`, (client) => {
    const swithState = client.getState(
      entities.global.switch.livingRoomMotionSensor
    );
    return state === swithState;
  });
