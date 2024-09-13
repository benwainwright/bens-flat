import { EventBus, renderSimpleLog, when } from "hass-lego";

import { getConnection } from "@lib";

import {
  bathroomMotionSensor,
  bedroomMotionSensor,
  hallwayMotionSensor,
  livingRoomMotionSensor,
  tvModeOff,
  tvModeOn,
  triggerTvModeOff,
  triggerTvModeOn,
  openAndCloseBlinds,
  whenILeaveHome,
  homeMode,
  homeModeSwitchChangesToOff,
  welcomeHomeRoutine,
} from "@automations";

const events = new EventBus();

export const client = await getConnection(events);

if (!client) {
  throw new Error("Failed to connect to Home Assistant!");
}

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

renderSimpleLog(events, false);

const server = client.getWebsocketServer();

const port = 3001;

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
