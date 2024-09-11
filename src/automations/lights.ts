import {
  turnBathroomLightsOff,
  turnBathroomLightsOn,
  turnBedroomLightsOff,
  turnBedroomLightsOn,
  turnHallwayLightsOff,
  turnHallwayLightsOn,
  turnLivingRoomLightsOff,
  turnLivingRoomLightsOn,
} from "../actions/hass/switch-light.ts";
import { waitMinutes } from "../actions/utils/wait-minutes.ts";
import { bathroomMotionSensorIs } from "../assertions/bathroom-motion-sensor-is.ts";
import { bedroomMotionSensorIs } from "../assertions/bedroom-motion-sensor-is.ts";
import { hallwayMotionSensorIs } from "../assertions/hallway-motion-sensor-is.ts";
import { livingRoomMotionSensorIs } from "../assertions/living-room-motion-sensor-is.ts";
import { sleepModeIs } from "../assertions/sleep-mode-is.ts";
import { ifTvModeIs } from "../assertions/tv-mode-is.ts";
import { Automation, ExecutionMode } from "hass-lego";
import { motionDetectedInBathroom } from "../triggers/motion-detected-in-bathroom.ts";
import { motionDetectedInBedroom } from "../triggers/motion-detected-in-bedroom.ts";
import { motionDetectedInHallway } from "../triggers/motion-detected-in-hallway.ts";
import { motionDetectedInLivingRoom } from "../triggers/motion-detected-in-living-room.ts";

export const livingRoomMotionSensor = new Automation({
  name: "Living room motion sensor",
  trigger: motionDetectedInLivingRoom,
  mode: ExecutionMode.Restart,
  actions: [
    ifTvModeIs("off"),
    livingRoomMotionSensorIs("on"),
    turnLivingRoomLightsOn,
    waitMinutes(30),
    turnLivingRoomLightsOff,
  ] as const,
});

export const bedroomMotionSensor = new Automation({
  name: "Bedroom motion sensor",
  trigger: motionDetectedInBedroom,
  mode: ExecutionMode.Restart,
  actions: [
    sleepModeIs("off"),
    bedroomMotionSensorIs("on"),
    turnBedroomLightsOn,
    waitMinutes(10),
    turnBedroomLightsOff,
  ],
});

export const bathroomMotionSensor = new Automation({
  name: "Bathroom motion sensor",
  trigger: motionDetectedInBathroom,
  mode: ExecutionMode.Restart,
  actions: [
    bathroomMotionSensorIs("on"),
    turnBathroomLightsOn,
    waitMinutes(5),
    turnBathroomLightsOff,
  ],
});

export const hallwayMotionSensor = new Automation({
  name: "Hallway motion sensor",
  trigger: motionDetectedInHallway,
  mode: ExecutionMode.Restart,
  actions: [
    hallwayMotionSensorIs("on"),
    turnHallwayLightsOn,
    waitMinutes(2),
    turnHallwayLightsOff,
  ],
});
