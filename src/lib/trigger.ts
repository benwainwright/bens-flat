import { StateChangedEvent } from "home-assistant-js-websocket";
import { Logger } from "../types/logger.ts";

export class Trigger {
  public constructor(
    public readonly name: string,
    public readonly id: string,
    public readonly predicate?: (event: StateChangedEvent) => boolean,
  ) {}

  public doTrigger(event: StateChangedEvent, logger: Logger): boolean {
    return this.predicate ? this.predicate(event) : true;
  }
}
