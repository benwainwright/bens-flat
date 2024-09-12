import { entities } from "../entities.ts";
import { Assertion } from "hass-lego";

export const ifHallwayMotionSensorIs = (state: string) =>
  new Assertion({
    name: `If Hallway motion sensor switch is ${state}`,
    predicate: (client) => {
      const switchState = client.getState(
        entities.global.switch.hallwayMotionSensor
      );
      return state === switchState;
    },
  });
