import { AutomationSequenceEvents } from "../types/automation-sequence-events.ts";
import { Logger } from "../types/logger.ts";
import { Client } from "./client.ts";

export class Action {
  public constructor(
    public readonly name: string,
    private callback:
      | ((client: Client) => void)
      | ((client: Client) => Promise<void>)
  ) {}

  public async execute(
    client: Client,
    logger: Logger,
    parent?: AutomationSequenceEvents
  ) {
    try {
      logger.trace(`[${parent?.name}] Starting action '${this.name}'`);
      await this.callback(client);
      logger.debug(`[${parent?.name}] Completed action '${this.name}'`);
    } catch (error) {
      if (error instanceof Error) {
        logger.error(
          `[${parent?.name}] Action '${this.name} failed for reason ${error.message}`
        );
      } else {
        throw error;
      }
    }
  }
}
