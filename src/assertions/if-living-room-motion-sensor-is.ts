import { entities } from "../entities.ts";
import { Assertion } from "hass-lego";

export const ifLivingRoomMotionSensorIs = (state: string) =>
  new Assertion({
    name: `If living room motion sensor switch is ${state}`,
    predicate: (client) => {
      const swithState = client.getState(
        entities.global.switch.livingRoomMotionSensor
      );
      return state === swithState;
    },
  });
