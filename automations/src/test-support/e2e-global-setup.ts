import { v2 as compose } from "docker-compose";
import path from "node:path";
import { delay } from "./delay.ts";
import { generateHassConfigWithVirtualDevices } from "./generate-virtual-config.ts";

export const setup = async () => {
  generateHassConfigWithVirtualDevices();
  console.log(" ℹ️  Starting test HASS server...");

  await compose.upAll({
    cwd: path.join(__dirname),
    commandOptions: ["--build"],
    callback: (chunk) => {
      console.log(`Job in progress: `, chunk.toString());
    },
  });

  void compose.logs("homeassistant", {
    follow: true,
    callback: (chunk) => {
      console.log(chunk.toString());
    },
  });

  await delay(10000);
};

export const teardown = async () => {
  console.log(" ℹ️  Stopping test HASS server...");
  await compose.down({
    cwd: path.join(__dirname),
  });
};
