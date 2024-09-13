import { LegoClient } from "hass-lego";
import {
  bathroomMotionSensor,
  bedroomMotionSensor,
  hallwayMotionSensor,
  livingRoomMotionSensor,
} from "./lights.ts";
import {
  triggerTvModeOff,
  triggerTvModeOn,
  tvModeOff,
  tvModeOn,
} from "./tv-mode.ts";
import { openAndCloseBlinds } from "./blinds.ts";
import {
  homeMode,
  homeModeSwitchChangesToOff,
  welcomeHomeRoutine,
  whenILeaveHome,
} from "./location.ts";

export const registerAllAutomations = (client: LegoClient) => {
  client.registerAutomation(livingRoomMotionSensor);
  client.registerAutomation(bedroomMotionSensor);
  client.registerAutomation(bathroomMotionSensor);
  client.registerAutomation(hallwayMotionSensor);
  client.registerAutomation(tvModeOn);
  client.registerAutomation(tvModeOff);
  client.registerAutomation(triggerTvModeOn);
  client.registerAutomation(triggerTvModeOff);
  client.registerAutomation(openAndCloseBlinds);
  client.registerAutomation(whenILeaveHome);
  client.registerAutomation(homeMode);
  client.registerAutomation(homeModeSwitchChangesToOff);
  client.registerAutomation(whenILeaveHome);
  client.registerAutomation(welcomeHomeRoutine);
};
