import { entities } from "../entities.ts";
import { Assertion } from "hass-lego";

const { livingRoomMotionSensor } = entities.switch;

export const ifLivingRoomMotionSensorIs = (state: string) =>
  new Assertion({
    name: `If living room motion sensor switch is ${state}`,
    predicate: (client) => {
      const switchState = client.getState(livingRoomMotionSensor.id);
      return state === switchState;
    },
  });
