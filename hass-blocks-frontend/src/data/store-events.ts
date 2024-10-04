import { Socket } from "socket.io-client";
import { DatabaseApi } from "./create-api";
import { TransmittedHassLegoEvent } from "@/types/transmitted-hass-lego-event";

export const recordEvents = async (socket: Socket, database: DatabaseApi) => {
  socket.on("hass-lego-event", async (event: TransmittedHassLegoEvent) => {
    if (!("block" in event || "trigger" in event) || !("triggerId" in event)) {
      return;
    }

    await database.blocks.update({
      id: event.block.id,
      name: event.name,
      type: event.type,
      status: event.status,
      updated: new Date(),
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
      if (event.type === "assertion") {
        console.log("DISREGARD cos duplicate");
      }
      return;
    }

    const output = {
      outputType: undefined,
      conditionResult: undefined,
      output: undefined,
      ...("output" in event
        ? event.output
        : { continue: true, outputType: undefined }),
    };

    console.log("output", output);
    console.log(event);

    await database.executions.update({
      id,
      triggerId: event.triggerId,
      type: event.type,
      output,
      status: event.status,
      updated: new Date(event.timestamp),
      instanceOf: { id: event.block.id, collection: "blocks" },
      parent:
        "parent" in event
          ? { id: event.parent?.id ?? "", collection: "blocks" }
          : undefined,
    });
  });
};
