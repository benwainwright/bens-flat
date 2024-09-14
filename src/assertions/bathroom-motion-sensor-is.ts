import { entities } from "../entities.ts";
import { Assertion } from "hass-lego";

const { bathroomMotionSensor } = entities.switch;

export const ifBathroomMotionSensorSwitchIs = (state: string) =>
  new Assertion({
    name: `Bathroom motion sensor switch is ${state}`,
    predicate: (client) => {
      const switchState = client.getState(bathroomMotionSensor.id);
      return state === switchState;
    },
  });
