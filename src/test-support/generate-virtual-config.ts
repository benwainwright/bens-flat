import { convert } from "@catalystic/json-to-yaml";

import { entities } from "../entities.ts";
import { readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { getIds } from "./get-ids.ts";
import { supportedWithInitialValues } from "./supported-by-virtual-with-initial-values.ts";

export const generateHassConfigWithVirtualDevices = () => {
  const __dirname = dirname(fileURLToPath(import.meta.url));

  const ids = getIds(entities);

  interface EntityConfig {
    platform: string;
    name: string;
    initial_value: string;
    persistent: false;
  }

  const makeEntityFromId = (
    domain: keyof typeof supportedWithInitialValues,
    id: string
  ): EntityConfig => {
    return {
      platform: "virtual",
      name: `!${id.replace(/_/g, " ")}`,
      initial_value: supportedWithInitialValues[domain],
      persistent: false,
    };
  };

  const virtualSensorConfig = ids.reduce<Record<string, EntityConfig[]>>(
    (accum, id) => {
      const [domain, idPart] = id.split(".");
      const domainAs = domain as keyof typeof supportedWithInitialValues;
      if (Object.keys(supportedWithInitialValues).includes(domain)) {
        if (domain in accum) {
          accum[domain] = [
            ...accum[domain],
            makeEntityFromId(domainAs, idPart),
          ];
        } else {
          accum[domain] = [makeEntityFromId(domainAs, idPart)];
        }
      }
      return accum;
    },
    {}
  );

  const configDir = join(__dirname, "..", "..", "hass-config");

  const baseConfig = readFileSync(
    join(configDir, "configuration.base.yaml"),
    "utf-8"
  );

  const newConfigContents = `${baseConfig}\n${convert(virtualSensorConfig)}`;

  const finalConfigPath = join(configDir, "configuration.yaml");

  writeFileSync(finalConfigPath, newConfigContents);

  console.log(`Written test HASS config to ${finalConfigPath}`);
};
