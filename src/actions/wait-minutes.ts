import { Action } from "hass-lego";

export const waitMinutes = (duration: number) =>
  new Action(`Wait ${duration} minutes`, async () => {
    return await new Promise<void>((accept) =>
      setTimeout(accept, 1000 * 60 * duration)
    );
  });
