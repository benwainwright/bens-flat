import { entities } from "../entities.ts";
import { Assertion } from "hass-lego";

export const ifBedroomMotionSensorIs = (state: string) =>
  new Assertion({
    name: `If bedroom motion sensor switch is ${state}`,
    predicate: (client) => {
      const switchState = client.getState(
        entities.global.switch.bedroomMotionSensor
      );
      return state === switchState;
    },
  });
