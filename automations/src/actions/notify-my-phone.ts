import { Action } from "hass-lego";

export const notifyMyPhone = (title: string, message: string) => {
  return new Action({
    name: `Notify my phone: ${message}`,
    callback: async (client) => {
      await client.callService({
        domain: "notify",
        service: "mobile_app_bens_iphone",
        data: {
          message,
          title,
        },
      });
    },
  });
};
