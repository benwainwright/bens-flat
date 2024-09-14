import { Automation, ExecutionMode } from "hass-lego";

import {
  turnBathroomLightsOff,
  turnBathroomLightsOn,
  turnBedroomLightsOff,
  turnBedroomLightsOn,
  turnHallwayLightsOff,
  turnHallwayLightsOn,
  turnLivingRoomLightsOff,
  turnLivingRoomLightsOn,
  waitMinutes,
} from "@actions";

import {
  ifBedroomMotionSensorIs,
  ifHallwayMotionSensorIs,
  ifLivingRoomMotionSensorIs,
  ifSleepModeIs,
  ifTvModeIs,
} from "@assertions";

import {
  whenMotionIsDetectedInTheBathroom,
  whenMotionIsDetectedInTheHallway,
  whenMotionIsDetectedInTheLivingRoom,
} from "@triggers";
import { whenMotionIsDetectedInBedroom } from "../triggers/when-motion-is-detected-in-the-bedroom.ts";

export const livingRoomMotionSensor = new Automation({
  name: "Living room motion sensor",
  trigger: whenMotionIsDetectedInTheLivingRoom,
  mode: ExecutionMode.Restart,
  actions: [
    ifTvModeIs("off"),
    ifLivingRoomMotionSensorIs("on"),
    turnLivingRoomLightsOn,
    waitMinutes(30),
    turnLivingRoomLightsOff,
  ] as const,
});

export const bedroomMotionSensor = new Automation({
  name: "Bedroom motion sensor",
  trigger: whenMotionIsDetectedInBedroom,
  mode: ExecutionMode.Restart,
  actions: [
    ifSleepModeIs("off"),
    ifBedroomMotionSensorIs("on"),
    turnBedroomLightsOn,
    waitMinutes(10),
    turnBedroomLightsOff,
  ],
});

export const bathroomMotionSensor = new Automation({
  name: "Bathroom motion sensor",
  trigger: whenMotionIsDetectedInTheBathroom,
  mode: ExecutionMode.Restart,
  actions: [
    ifBedroomMotionSensorIs("on"),
    turnBathroomLightsOn,
    waitMinutes(5),
    turnBathroomLightsOff,
  ],
});

export const hallwayMotionSensor = new Automation({
  name: "Hallway motion sensor",
  trigger: whenMotionIsDetectedInTheHallway,
  mode: ExecutionMode.Restart,
  actions: [
    ifHallwayMotionSensorIs("on"),
    turnHallwayLightsOn,
    waitMinutes(2),
    turnHallwayLightsOff,
  ],
});
