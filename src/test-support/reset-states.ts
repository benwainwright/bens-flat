import { IClient } from "homeassistant-typescript";
import { Domain, domains, entities, Entity } from "../entities.ts";
import { Call, setStates } from "./set-states.ts";

export const resetStatesToInitialValues = async (client: IClient) => {
  const calls = Object.entries(entities).flatMap(([domain, entities]) => {
    const config = domains[domain as Domain];

    if ("commands" in config) {
      return Object.values<Entity>(entities).map<Call>((entity) => [
        entity.id,
        entity.initial_state,
      ]);
    }
    return [];
  });

  await setStates(client, calls);
};
