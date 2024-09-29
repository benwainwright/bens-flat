import { Socket } from "socket.io-client";
import { DatabaseApi } from "./create-api";
import { TransmittedHassLegoEvent } from "@/types/transmitted-hass-lego-event";

export const recordEvents = async (socket: Socket, database: DatabaseApi) => {
  socket.on("hass-lego-event", async (event: TransmittedHassLegoEvent) => {
    if (!("block" in event) || !("triggerId" in event)) {
      return;
    }

    await database.blocks.update({
      id: event.block.id,
      name: event.name,
      type: event.type,
      status: event.status,
    });

    await database.executions.update({
      id: event.type === "trigger" ? event.triggerId : event.executeId,
      triggerId: event.triggerId,
      type: event.type,
      status: event.status,
      instanceOf: { id: event.block.id, collection: "blocks" },
      parent:
        "parent" in event
          ? { id: event.parent?.id ?? "", collection: "blocks" }
          : undefined,
    });
  });
};
