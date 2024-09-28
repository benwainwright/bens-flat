import { convert } from "@catalystic/json-to-yaml";

import { Domain, domains, entities, Entity } from "../entities.ts";
import { readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

interface EntityConfig {
  platform: string;
  name: string;
  initial_value: string;
  persistent: false;
}

const makeEntityFromId = (domain: Domain, entity: Entity): EntityConfig => {
  const [, idPart] = entity.id.split(".");
  return {
    platform: "virtual",
    name: `!${idPart.replace(/_/g, " ")}`,
    initial_value: entity.initial_state,
    persistent: false,
  };
};
export const generateHassConfigWithVirtualDevices = () => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const config = Object.entries(entities).reduce<
    Record<string, EntityConfig[]>
  >((accum, [domain, entities]) => {
    const supported = Object.entries(domains)
      .filter(([, config]) => config.supportedByVirtual)
      .map(([domain]) => domain);

    if (supported.includes(domain)) {
      accum[domain] = Object.values<Entity>(entities).map((entity) =>
        makeEntityFromId(domain as Domain, entity)
      );
    }
    return accum;
  }, {});

  const configDir = join(__dirname, "..", "..", "hass-config");

  const baseConfig = readFileSync(
    join(configDir, "configuration.base.yaml"),
    "utf-8"
  );

  const newConfigContents = `${baseConfig}\n${convert(config)}`;

  const finalConfigPath = join(configDir, "configuration.yaml");

  writeFileSync(finalConfigPath, newConfigContents);

  console.log(`Written test HASS config to ${finalConfigPath}`);
};
