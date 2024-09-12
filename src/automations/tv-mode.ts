import { Automation, concurrently, sequence } from "hass-lego";

import { entities } from "../entities.ts";

import {
  closeLivingRoomBlinds,
  deleteScene,
  openLivingRoomBlinds,
  pauseMusicInTheLivingRoom,
  recordStateOfLivingRoom,
  turnOffAdaptiveLightingInTheLivingRoom,
  turnOnScene,
  turnOnTvLightsScene,
  turnTvModeOff,
  turnTvModeOn,
  waitMinutes,
} from "@actions";

import {
  whenIStartPlayingAGameOnMyXBox,
  whenIStartWatchingSomethingOnTheAppleTv,
  whenIStopPlayingAGameOnMyXbox,
  whenTvModeSwitchesTo,
} from "@triggers";

import {
  ifLivingRoomStateHasAlreadyBeenSaved,
  ifSwitchIsOn,
  ifTvModeIs,
} from "@assertions";

export const triggerTvModeOn = new Automation({
  name: "Turn TV mode switch on",
  trigger: [
    whenIStartPlayingAGameOnMyXBox,
    whenIStartWatchingSomethingOnTheAppleTv,
  ],
  actions: [turnTvModeOn],
});

export const triggerTvModeOff = new Automation({
  name: "Turn TV mode switch off",
  trigger: [
    whenIStopPlayingAGameOnMyXbox,
    whenIStartWatchingSomethingOnTheAppleTv,
  ],
  actions: [turnTvModeOff],
});

export const tvModeOn = new Automation({
  trigger: whenTvModeSwitchesTo("on"),
  name: "TV mode turns on",
  actions: [
    recordStateOfLivingRoom,
    concurrently([
      turnOnTvLightsScene,
      closeLivingRoomBlinds,
      pauseMusicInTheLivingRoom,
      turnOffAdaptiveLightingInTheLivingRoom,
    ]),
  ],
});

export const tvModeOff = new Automation({
  trigger: whenTvModeSwitchesTo("off"),
  name: "TV mode turns off",
  actions: [
    concurrently([
      sequence([
        ifLivingRoomStateHasAlreadyBeenSaved,
        turnOnScene(entities.livingRoom.restoreState),
        deleteScene(entities.livingRoom.restoreState),
      ]),
      sequence([
        waitMinutes(5),
        ifTvModeIs("off"),
        ifSwitchIsOn(entities.global.switch.blindsDefaultPositionOpen),
        openLivingRoomBlinds,
      ]),
    ]),
  ],
});
