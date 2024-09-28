import { getConfig } from "homeassistant-typescript";
import { writeFileSync } from "node:fs";

const makeRequest = async () => {
  const config = getConfig();

  const finalUrl = `http://${config.host}:${config.port}${config.httpPath}/addons/self/info`;

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

const outputIngressEntry = async () => {
  const {
    data: { ingress_url },
  } = await makeRequest();

  writeFileSync("ingress-entry", ingress_url);
  console.log(`Written ingress URL: ${ingress_url}`);
};

outputIngressEntry().catch((e) => console.log(e));
