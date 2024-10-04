import { getHassBlocksSocket } from "./data/get-socket";
import { initialise } from "./data/initialise";
import { recordEvents } from "./data/store-events";
import { updateAutomations } from "./data/update-automations";
import { startNextServer } from "./server/next";

await startNextServer();

const socket = await getHassBlocksSocket();

const database = await initialise();

await updateAutomations(socket, database);

recordEvents(socket, database);
