import { IClient } from "homeassistant-typescript";
import { entities } from "../entities.ts";
import { getIds } from "./get-ids.ts";
import { supportedWithInitialValues } from "./supported-by-virtual-with-initial-values.ts";

export const assignAreas = async (client: IClient) => {
  await Promise.all(
    Object.entries(entities)
      .filter(([key]) => key !== "global")
      .flatMap(async ([area, ids]) => {
        const areaId = area
          .split(/\.?(?=[A-Z])/)
          .join("_")
          .toLowerCase();

        const idsToAddToArea = getIds(ids);

        return idsToAddToArea.map(async (id) => {
          const [domain, idPart] = id.split(".");
          if (Object.keys(supportedWithInitialValues).includes(domain)) {
            console.log(`Adding ${id} to ${areaId}`);
            await client.callService({
              domain: "homeassistant",
              service: "add_entity_to_area",
              service_data: {
                area_id: areaId,
                entity_id: id,
              },
            });
          }
        });
      })
  );
};
