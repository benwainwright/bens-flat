import { entities } from "../entities.ts";
import { Assertion } from "hass-lego";

const { bedroomMotionSensor } = entities.switch;

export const ifBedroomMotionSensorIs = (state: string) =>
  new Assertion({
    name: `If bedroom motion sensor switch is ${state}`,
    predicate: (client) => {
      const switchState = client.getState(bedroomMotionSensor.id);
      return state === switchState;
    },
  });
