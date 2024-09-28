import { entities } from "../entities.ts";
import { Assertion } from "hass-lego";

const { hallwayMotionSensor } = entities.switch;

export const ifHallwayMotionSensorIs = (state: string) =>
  new Assertion({
    name: `If Hallway motion sensor switch is ${state}`,
    predicate: (client) => {
      const switchState = client.getState(hallwayMotionSensor.id);
      return state === switchState;
    },
  });
