import { EventBus, renderSimpleLog } from "hass-lego";
import {
  bathroomMotionSensor,
  bedroomMotionSensor,
  hallwayMotionSensor,
  livingRoomMotionSensor,
} from "./automations/lights.ts";

import { getConnection } from "./lib/get-connection.ts";
import {
  tvModeOff,
  tvModeOn,
  triggerTvModeOff,
  triggerTvModeOn,
} from "./automations/tv-mode.ts";

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

renderSimpleLog(events, false);

const server = client.getWebsocketServer();

const port = 3001;

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
