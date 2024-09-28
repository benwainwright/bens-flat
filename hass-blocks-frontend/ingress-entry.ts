import { makeHassRequest } from "./src/utils/make-hass-request";
import { writeFileSync } from "node:fs";
import internal from "node:stream";

const outputIngressEntry = async () => {
  const {
    data: { ingress_url: frontendIngressUrl },
  } = await makeHassRequest(`/addons/self/info`);

  const {
    data: { ingress_url: hassBlocksIngressUrl },
  } = await makeHassRequest(`/addons/hass-blocks/info`);

  const config = JSON.stringify(
    {
      frontendIngressUrl,
      hassBlocksIngressUrl,
    },
    null,
    2
  );

  writeFileSync("config-build", config);
  console.log(`Written config: ${config}`);
};

outputIngressEntry().catch((e) => console.log(e));
