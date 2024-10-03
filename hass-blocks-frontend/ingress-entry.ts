import { makeHassRequest } from "./src/utils/make-hass-request";
import { writeFileSync } from "node:fs";

const outputIngressEntry = async () => {
  const {
    data: { ingress_url: frontendIngressUrl, slug },
  } = await makeHassRequest(`/addons/self/info`);

  const config = JSON.stringify(
    {
      slug,
      frontendIngressUrl,
    },
    null,
    2,
  );

  writeFileSync("config-build", config);
  console.log(`Written config: ${config}`);
};

outputIngressEntry().catch((e) => console.log(e));
