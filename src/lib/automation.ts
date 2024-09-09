import { Action } from "./action.ts";
import { Client } from "./client.ts";
import { Logger } from "../types/logger.ts";
import { Trigger } from "./trigger.ts";
import { AutomationSequenceEvents } from "../types/automation-sequence-events.ts";

export class Automation {
  public constructor(
    public readonly name: string,
    private config:
      | {
          trigger?: Trigger;
          actions: AutomationSequenceEvents[];
        }
      | AutomationSequenceEvents[]
  ) {}

  public attachTrigger(client: Client, logger: Logger) {
    if (!Array.isArray(this.config) && this.config.trigger) {
      const { trigger } = this.config;
      client.onStateChanged(trigger.id, async (event) => {
        if (!trigger.predicate || trigger.predicate(event)) {
          logger.info(`'${this.name} triggered by '${trigger.name}'`);
          await this.execute(client, logger);
        }
      });
    } else {
      throw new Error("Automation has no trigger so cannot be attached");
    }
  }

  public async execute(client: Client, logger: Logger) {
    const sequence = Array.isArray(this.config)
      ? this.config
      : this.config.actions;

    await sequence.reduce(async (previousPromise, nextItem) => {
      const lastExecution = await previousPromise;
      if (!lastExecution) {
        return false;
      }
      if (nextItem instanceof Action || nextItem instanceof Automation) {
        await nextItem.execute(client, logger);
        return true;
      }
      return await nextItem.runPredicate(client, logger);
    }, Promise.resolve(true));
    logger.debug(`Finished execution of '${this.name}'`);
  }
}
