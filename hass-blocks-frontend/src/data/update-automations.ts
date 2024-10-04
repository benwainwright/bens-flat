import { Socket } from "socket.io-client";
import { DatabaseApi } from "./create-api";

export const updateAutomations = async (
  socket: Socket,
  database: DatabaseApi,
) => {
  return new Promise<void>((accept) => {
    socket.emit("request-automations");

    socket.once(
      "automations",
      async (automationsFromLego: { id: string; name: string }[]) => {
        const automations = await database.blocks.getAll({
          type: "automation",
        });

        const missing = automationsFromLego
          .filter(
            (recievedAutomation) =>
              !automations
                .map((automation) => automation.id)
                .includes(recievedAutomation.id),
          )
          .map((newAutomation) => {
            return {
              ...newAutomation,
              status: "created",
              type: "automation",
            };
          });

        await database.blocks.update(...missing);
        accept();
      },
    );
  });
};
