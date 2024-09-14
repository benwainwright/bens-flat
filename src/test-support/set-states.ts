import { IClient } from "homeassistant-typescript";
import { Domain, domains } from "../entities.ts";

export type Call = [id: string, state: string];

export const setStates = async (client: IClient, calls: Call[]) => {
  await Promise.all(
    calls.map(async ([id, state]) => {
      const [domain] = id.split(".");
      const config = domains[domain as Domain];

      if (!("commands" in config)) {
        throw new Error(`No commands for domain ${domain}`);
      }

      type States = typeof config.commands;

      // @ts-ignore
      const [commandDomain, service] = config.commands[state as any].split(".");

      await client.callService({
        domain: commandDomain,
        service: service,
        service_data: {
          entity_id: id,
        },
      });
    })
  );
};
