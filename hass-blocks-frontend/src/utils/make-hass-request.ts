import { getConfig } from "homeassistant-typescript";

export const makeHassRequest = async (path: string) => {
  const config = getConfig();

  const finalUrl = `http://${config.host}:${config.port}${path}`;

  console.log(finalUrl);

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

  const result = await response.json();

  return result;
};
