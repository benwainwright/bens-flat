import { Automation, concurrently, ExecutionMode, sequence } from "hass-lego";
import { whenMotionIsDetectedInBedroom } from "../triggers/when-motion-is-detected-in-the-bedroom.ts";
import {
  whenHomeModeTurnsOff,
  whenHomeModeTurnsOn,
  whenIGoOut,
  whenMotionIsDetectedInTheBathroom,
  whenMotionIsDetectedInTheHallway,
  whenMotionIsDetectedInTheLivingRoom,
} from "@triggers";
import {
  zoneExitChecks,
  turnHomeModeOff,
  turnHomeModeOn,
  waitMinutes,
  turnBathroomLightsOff,
  turnBedroomLightsOff,
  turnHallwayLightsOff,
  turnLivingRoomLightsOff,
  pauseMusicInTheLivingRoom,
  pauseMusicInTheBedroom,
  turnOffTv,
  turnOffImac,
  closeLivingRoomBlinds,
  playMyDiscoverWeekly,
  mediaPlayerSetVolume,
  openLivingRoomBlinds,
} from "@actions";
import {
  amIHome,
  amIOut,
  ifBlindsDefaultPositionIsSetToOpen,
  ifHomeModeIsOff,
  ifSwitchIsOff,
} from "@assertions";
import { entities } from "../entities.ts";
import { notifyMyPhone } from "../actions/notify-my-phone.ts";

const { turnOffZoneExitChecks, turnOnZoneExitChecks, ifZoneExitChecksAreOn } =
  zoneExitChecks();

export const homeMode = new Automation({
  name: "Trigger home mode",
  trigger: [
    whenMotionIsDetectedInBedroom,
    whenMotionIsDetectedInTheBathroom,
    whenMotionIsDetectedInTheHallway,
    whenMotionIsDetectedInTheLivingRoom,
  ],
  mode: ExecutionMode.Restart,
  actions: [
    concurrently([
      turnOffZoneExitChecks,
      sequence([waitMinutes(5), turnOnZoneExitChecks, amIOut, turnHomeModeOff]),
      sequence([ifHomeModeIsOff, amIHome, turnHomeModeOn]),
    ]),
  ],
});

export const whenILeaveHome = new Automation({
  name: "Turn off home mode when I go out",
  trigger: [whenIGoOut],
  actions: [ifZoneExitChecksAreOn, turnHomeModeOff],
});

export const homeModeSwitchChangesToOff = new Automation({
  name: "Home mode switch changes to off",
  trigger: whenHomeModeTurnsOff,
  actions: [
    ifSwitchIsOff(entities.global.switch.visitorMode),
    concurrently([
      turnBathroomLightsOff,
      turnBedroomLightsOff,
      turnHallwayLightsOff,
      turnLivingRoomLightsOff,
      pauseMusicInTheLivingRoom,
      pauseMusicInTheBedroom,
      turnOffTv,
      turnOffImac,
      notifyMyPhone(
        "Leaving flat",
        "You've left home so all devices have been turned off."
      ),
      closeLivingRoomBlinds,
    ]),
  ],
});

export const welcomeHomeRoutine = new Automation({
  name: "Welcome home routine",
  trigger: whenHomeModeTurnsOn,
  actions: [
    mediaPlayerSetVolume(
      [entities.bedroom.speaker, entities.livingRoom.speaker],
      0.5
    ),
    playMyDiscoverWeekly,
    ifBlindsDefaultPositionIsSetToOpen,
    openLivingRoomBlinds,
  ],
});
