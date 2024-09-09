import {
  bathroomMotionSensor,
  bedroomMotionSensor,
  hallwayMotionSensor,
  livingRoomMotionSensor,
} from "./automations/lights.ts";

import { getConnection } from "./lib/get-connection.ts";

export const client = await getConnection();

if (!client) {
  throw new Error("Failed to connect to Home Assistant!");
}

client.registerAutomation(livingRoomMotionSensor);
client.registerAutomation(bedroomMotionSensor);
client.registerAutomation(bathroomMotionSensor);
client.registerAutomation(hallwayMotionSensor);
