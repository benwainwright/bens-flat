import { Action } from "hass-lego";

export const turnOffImac = new Action({
  name: "Turn off my iMac",
  callback: async (client) => {
    await client.callService({
      domain: "mqtt",
      service: "publish",
      data: {
        topic: "bens_imac/commands/shutdown",
        payload: "go",
      },
    });
  },
});
