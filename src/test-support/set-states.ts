import { IClient } from "homeassistant-typescript";
import { Domain, domains } from "../entities.ts";

export type Call = [id: string, state: string];

export const setStates = async (...calls: Call[]) => {
  console.log(`Setstates: ${calls}`);
  await Promise.all(
    calls.map(async ([id, state]) => {
      const [domain] = id.split(".");
      const config = domains[domain as Domain];

      if (!("commands" in config)) {
        throw new Error(`No commands for domain ${domain}`);
      }

      // @ts-ignore
      const [commandDomain, service] = config.commands[state as any].split(".");

      const params = {
        domain: commandDomain,
        service: service,
        service_data: {
          entity_id: id,
        },
      };

      console.log(params);

      await rawClient.callService(params);
    })
  );
};
