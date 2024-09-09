import { entities } from "../entities.ts";
import { Assertion } from "hass-lego";

export const bedroomMotionSensorIs = (state: string) =>
  new Assertion({
    name: `Bedroom motion sensor switch is ${state}`,
    predicate: (client) => {
      const switchState = client.getState(
        entities.global.switch.bedroomMotionSensor
      );
      return state === switchState;
    },
  });
