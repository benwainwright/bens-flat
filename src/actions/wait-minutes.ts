import { Action } from "../lib/action.ts";

export const waitMinutes = (duration: number) =>
  new Action(`Wait ${duration} minutes`, async () => {
    return await new Promise((accept) =>
      setTimeout(accept, 1000 * 60 * duration),
    );
  });
