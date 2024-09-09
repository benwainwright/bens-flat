import {
  turnBedroomLightsOff,
  turnBedroomLightsOn,
  turnLivingRoomLightsOff,
  turnLivingRoomLightsOn,
} from "../actions/switch-light.ts";
import { waitMinutes } from "../actions/wait-minutes.ts";
import { bedroomMotionSensorIs } from "../assertions/bedroom-motion-sensor-is.ts";
import { livingRoomMotionSensorIs } from "../assertions/living-room-motion-sensor-is.ts";
import { sleepModeIs } from "../assertions/sleep-mode-is.ts";
import { tvModeIs } from "../assertions/tv-mode-is.ts";
import { entities } from "../entities.ts";
import { Automation } from "../lib/automation.ts";
import { Client } from "../lib/client.ts";

const livingRoomMotionSensor = new Automation("Living room motion sensor", [
  tvModeIs("off"),
  livingRoomMotionSensorIs("on"),
  turnLivingRoomLightsOn,
  waitMinutes(30),
  turnLivingRoomLightsOff,
]);

const bedroomMotionSensor = new Automation("Bedroom motion sensor", [
  sleepModeIs("off"),
  bedroomMotionSensorIs("on"),
  turnBedroomLightsOn,
  waitMinutes(1),
  turnBedroomLightsOff,
]);

export const configureLights = (client: Client) => {
  client.addAutomationTrigger(
    entities.livingRoom.motionSensor,
    livingRoomMotionSensor,
  );

  client.addAutomationTrigger(
    entities.bedroom.motionSensor,
    bedroomMotionSensor,
  );
};
