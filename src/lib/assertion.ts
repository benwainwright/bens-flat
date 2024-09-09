import { AutomationSequenceEvents } from "../types/automation-sequence-events.ts";
import { Logger } from "../types/logger.ts";
import { Client } from "./client.ts";

export class Assertion {
  public constructor(
    public readonly name: string,
    private readonly predicate:
      | ((client: Client) => boolean)
      | ((client: Client) => Promise<boolean>)
  ) {}

  public runPredicate(
    client: Client,
    logger: Logger,
    parent?: AutomationSequenceEvents
  ) {
    logger.trace(`[${parent?.name}] Starting assertion '${this.name}'`);
    const result = this.predicate(client);
    if (result) {
      logger.debug(
        `[${parent?.name}] Assertion '${this.name}' was true, continuing execution`
      );
    } else {
      logger.debug(
        `[${parent?.name}] Assertion '${this.name}' was false, aborting`
      );
    }
    return result;
  }
}
