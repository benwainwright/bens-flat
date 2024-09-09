import { HassEntity } from "home-assistant-js-websocket";
import { Action } from "./action.ts";
import { Assertion } from "./assertion.ts";
import { Client } from "./client.ts";
import { Logger } from "../types/logger.ts";

export class Automation {
  public constructor(
    public readonly name: string,
    private actions: (Action | Assertion)[],
  ) {}

  public async execute(client: Client, logger: Logger) {
    await this.actions.reduce(async (previousPromise, nextItem) => {
      const lastExecution = await previousPromise;
      if (!lastExecution) {
        return false;
      }
      if (nextItem instanceof Action) {
        await nextItem.execute(client, logger);
        return true;
      }
      return await nextItem.runPredicate(client, logger);
    }, Promise.resolve(true));
    logger.debug(`Finished execution of '${this.name}'`);
  }
}
