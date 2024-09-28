import { IClient } from "homeassistant-typescript";
import { domains, entities, Entity } from "../entities.ts";

export const assignAreas = async (client: IClient) => {
  const supported = Object.entries(domains)
    .filter(([, config]) => config.supportedByVirtual)
    .map(([domain]) => domain);

  await Promise.all(
    Object.entries(entities).flatMap(([domain, entities]) => {
      if (supported.includes(domain)) {
        return Object.values<Entity>(entities).map(async (entity) => {
          if (entity.area !== "none") {
            await client.callService({
              domain: "homeassistant",
              service: "add_entity_to_area",
              service_data: {
                area_id: entity.area,
                entity_id: entity.id,
              },
            });
          }
        });
      }
    })
  );
};
