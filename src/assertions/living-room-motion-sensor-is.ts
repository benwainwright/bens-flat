import { entities } from "../entities.ts";
import { Assertion } from "hass-lego";

export const livingRoomMotionSensorIs = (state: string) =>
  new Assertion({
    name: `Living room motion sensor switch is ${state}`,
    predicate: (client) => {
      const swithState = client.getState(
        entities.global.switch.livingRoomMotionSensor
      );
      return state === swithState;
    },
  });
