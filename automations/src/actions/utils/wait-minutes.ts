import { Action } from "hass-lego";

export const waitMinutes = (duration: number) =>
  new Action({
    name: `Wait ${duration} minutes`,
    callback: async () => {
      return await new Promise<void>((accept) =>
        setTimeout(
          () => {
            accept();
          },
          1000 * 60 * duration
        )
      );
    },
  });
