import {
  turnBathroomLightsOff,
  turnBathroomLightsOn,
  turnBedroomLightsOff,
  turnBedroomLightsOn,
  turnHallwayLightsOff,
  turnHallwayLightsOn,
  turnLivingRoomLightsOff,
  turnLivingRoomLightsOn,
} from "../actions/switch-light.ts";
import { waitMinutes } from "../actions/wait-minutes.ts";
import { bathroomMotionSensorIs } from "../assertions/bathroom-motion-sensor-is.ts";
import { bedroomMotionSensorIs } from "../assertions/bedroom-motion-sensor-is.ts";
import { hallwayMotionSensorIs } from "../assertions/hallway-motion-sensor-is.ts";
import { livingRoomMotionSensorIs } from "../assertions/living-room-motion-sensor-is.ts";
import { sleepModeIs } from "../assertions/sleep-mode-is.ts";
import { tvModeIs } from "../assertions/tv-mode-is.ts";
import { Automation } from "../lib/automation.ts";
import { motionDetectedInBathroom } from "../triggers/motion-detected-in-bathroom.ts";
import { motionDetectedInBedroom } from "../triggers/motion-detected-in-bedroom.ts";
import { motionDetectedInHallway } from "../triggers/motion-detected-in-hallway.ts";
import { motionDetectedInLivingRoom } from "../triggers/motion-detected-in-living-room.ts";

export const livingRoomMotionSensor = new Automation(
  "Living room motion sensor",
  {
    trigger: motionDetectedInLivingRoom,
    actions: [
      tvModeIs("off"),
      livingRoomMotionSensorIs("on"),
      turnLivingRoomLightsOn,
      waitMinutes(30),
      turnLivingRoomLightsOff,
    ],
  }
);

export const bedroomMotionSensor = new Automation("Bedroom motion sensor", {
  trigger: motionDetectedInBedroom,
  actions: [
    sleepModeIs("off"),
    bedroomMotionSensorIs("on"),
    turnBedroomLightsOn,
    waitMinutes(10),
    turnBedroomLightsOff,
  ],
});

export const bathroomMotionSensor = new Automation("Bathroom motion sensor", {
  trigger: motionDetectedInBathroom,
  actions: [
    bathroomMotionSensorIs("on"),
    turnBathroomLightsOn,
    waitMinutes(5),
    turnBathroomLightsOff,
  ],
});

export const hallwayMotionSensor = new Automation("Hallway motion sensor", {
  trigger: motionDetectedInHallway,
  actions: [
    hallwayMotionSensorIs("on"),
    turnHallwayLightsOn,
    waitMinutes(2),
    turnHallwayLightsOff,
  ],
});
