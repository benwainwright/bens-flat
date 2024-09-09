import { EventBus, renderSimpleLog } from "hass-lego";
import {
  bathroomMotionSensor,
  bedroomMotionSensor,
  hallwayMotionSensor,
  livingRoomMotionSensor,
} from "./automations/lights.ts";

import { getConnection } from "./lib/get-connection.ts";

const events = new EventBus();

export const client = await getConnection(events);

if (!client) {
  throw new Error("Failed to connect to Home Assistant!");
}

client.registerAutomation(livingRoomMotionSensor);
client.registerAutomation(bedroomMotionSensor);
client.registerAutomation(bathroomMotionSensor);
client.registerAutomation(hallwayMotionSensor);

renderSimpleLog(events);
