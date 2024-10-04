import { getConfig } from "homeassistant-typescript";
import { HassRequestApiMap } from "./hass-request-api-map";

export const makeHassRequest = async <P extends keyof HassRequestApiMap>(
  path: P,
) => {
  const config = getConfig();

  const finalUrl = `http://${config.host}:${config.port}${path}`;

  const response = await fetch(finalUrl, {
    method: "GET",
    headers: {
      authorization: `Bearer ${config.token}`,
      "content-type": "application/json",
    },
  });

  if (!response.ok) {
    const result = await response.text();
    throw new Error(`Failed to fetch data: ${result}, ${response.status}`);
  }

  return (await response.json()) as HassRequestApiMap[P];
};
