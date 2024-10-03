import { Socket } from "socket.io-client";
import { DatabaseApi } from "./create-api";
import { TransmittedHassLegoEvent } from "@/types/transmitted-hass-lego-event";

export const recordEvents = async (socket: Socket, database: DatabaseApi) => {
  socket.on("hass-lego-event", async (event: TransmittedHassLegoEvent) => {
    if (!("block" in event || "trigger" in event) || !("triggerId" in event)) {
      return;
    }

    const block = "block" in event ? event.block : event.trigger;

    await database.blocks.update({
      id: block.id,
      name: event.name,
      type: event.type,
      status: event.status,
    });

    const id =
      event.type === "trigger"
        ? event.triggerId
        : "executeId" in event
          ? event.executeId
          : "";

    const previousExecutionRecords = await database.executions.getAll({ id });

    if (
      previousExecutionRecords.length > 0 &&
      previousExecutionRecords[0].status !== "started"
    ) {
      return;
    }

    await database.executions.update({
      id,
      triggerId: event.triggerId,
      type: event.type,
      status: event.status,
      instanceOf: { id: block.id, collection: "blocks" },
      parent:
        "parent" in event
          ? { id: event.parent?.id ?? "", collection: "blocks" }
          : undefined,
    });
  });
};
