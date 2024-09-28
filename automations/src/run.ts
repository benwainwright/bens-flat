import { EventBus, renderSimpleLog, when } from "hass-lego";

import { getConnection } from "@lib";

import { registerAllAutomations } from "./automations/register-all.ts";

const events = new EventBus();

export const client = await getConnection(events);

if (!client) {
  throw new Error("Failed to connect to Home Assistant!");
}

registerAllAutomations(client);

renderSimpleLog(events, true);

const server = client.getWebsocketServer({
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const port = 3001;

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
