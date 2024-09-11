import { Automation, concurrently, sequence } from "hass-lego";
import { tvModeChangesStateTo } from "../triggers/tv-mode-switches-to.ts";
import { turnOnTvLightsScene } from "../actions/turn-on-tv-lights.ts";
import { recordStateOfLivingRoom } from "../actions/record-state-of-living-room.ts";
import { closeLivingRoomBlinds } from "../actions/close-living-room-blinds.ts";
import { pauseMusicInTheLivingRoom } from "../actions/pause-music-in-the-living-room.ts";
import { turnOffAdaptiveLightingInTheLivingRoom } from "../actions/turn-off-adaptive-lighting-in-the-living-room.ts";
import { ifLivingRoomStateHasAlreadyBeenSaved } from "../assertions/if-living-room-state-has-already-been-saved.ts";
import { turnOnScene } from "../actions/hass/turn-on-scene.ts";
import { entities } from "../entities.ts";
import { deleteScene } from "../actions/hass/delete-scene.ts";
import { waitMinutes } from "../actions/utils/wait-minutes.ts";
import { ifTvModeIs } from "../assertions/tv-mode-is.ts";
import { ifSwitchIsOn } from "../assertions/hass/if-switch-is-off.ts";
import { openLivingRoomBlinds } from "../actions/open-living-room-blinds.ts";
import {
  whenIStartPlayingAGameOnMyXBox,
  whenIStopPlayingAGameOnMyXbox,
} from "../triggers/when-I-start-playing-a-game-on-my-xbox.ts";
import { turnTvModeOff, turnTvModeOn } from "../actions/turn-tv-mode.ts";
import { whenIStartWatchingSomethingOnTheAppleTv } from "../triggers/when-I-start-watching-something-on-the-apple-tv.ts";
import { whenIStopWatchingSomethingOnTheAppleTv } from "../triggers/when-I-stop-watching-something-on-the-apple-tv.ts";

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
    whenIStopWatchingSomethingOnTheAppleTv,
  ],
  actions: [turnTvModeOff],
});

export const tvModeOn = new Automation({
  trigger: tvModeChangesStateTo("on"),
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
  trigger: tvModeChangesStateTo("off"),
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
