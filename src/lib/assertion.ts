import { Logger } from "../types/logger.ts";
import { Client } from "./client.ts";

export class Assertion {
  public constructor(
    public readonly name: string,
    private readonly predicate:
      | ((client: Client) => boolean)
      | ((client: Client) => Promise<boolean>),
  ) {}

  public runPredicate(client: Client, logger: Logger) {
    logger.trace(`Starting assertion '${this.name}'`);
    const result = this.predicate(client);
    if (result) {
      logger.debug(`Assertion '${this.name}' was true, continuing execution`);
    } else {
      logger.debug(`Assertion '${this.name}' was false, aborting`);
    }
    return result;
  }
}
