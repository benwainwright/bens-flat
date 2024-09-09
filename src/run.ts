import { configureLights } from "./automations/lights.ts";
import { getConnection } from "./lib/get-connection.ts";

const connection = await getConnection();

if (!connection) {
  throw new Error("Failed to connect to Home Assistant!");
}

configureLights(connection);
