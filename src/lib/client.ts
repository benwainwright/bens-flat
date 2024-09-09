import { HassEntity, StateChangedEvent } from "home-assistant-js-websocket";
import { HassApi } from "homeassistant-ws";
import { Automation } from "./automation.ts";
import { Logger } from "../types/logger.ts";

export class Client {
  public states: Map<string, HassEntity> | undefined;

  public constructor(
    private client: HassApi,
    private logger: Logger
  ) {}

  public async init() {
    const states = (await this.client.getStates()) as HassEntity[];
    const statesMap = new Map<string, HassEntity>();
    states.forEach((state) => statesMap.set(state.entity_id, state));
    this.states = statesMap;
  }

  public getState(id: string) {
    return this.getEntity(id).state;
  }

  public getEntity(id: string) {
    if (!this.states) {
      throw new Error("Initial states not loaded");
    }
    const state = this.states.get(id);
    if (!state) {
      throw new Error(`Entity ${id} doesn't exist!`);
    }
    return state;
  }
  public async callService<T, A>(
    domain: string,
    service: string,
    extraArgs?: A,
    options?: {
      returnResponse?: boolean;
    }
  ): Promise<T> {
    return await this.client.callService(domain, service, extraArgs, options);
  }

  public addAutomationTrigger(id: string, automation: Automation) {
    this.onStateChanged(id, async (event) => {
      this.logger.info(
        `${id} changed, triggering automation ${automation.name}`
      );
      await automation.execute(this, this.logger);
    });
  }

  public registerAutomation(automation: Automation) {
    automation.attachTrigger(this, this.logger);
    this.logger.info(`Registered automation: ${automation.name}`);
  }

  public onStateChanged(
    id: string,
    callback: (event: StateChangedEvent) => void
  ) {
    if (!this.states) {
      throw new Error("Initial states not loaded");
    }

    if (!this.states.has(id)) {
      throw new Error("You tried to subscribe to an entity that doesn't exist");
    }

    this.client.on("state_changed", (event: StateChangedEvent) => {
      if (event.data.new_state && this.states) {
        this.states.set(event.data.entity_id, event.data.new_state);
      }
      if (event.data.entity_id === id) {
        try {
          callback(event);
        } catch (error) {
          if (error instanceof Error) {
            console.log(error.message);
          }
          throw error;
        }
      }
    });
  }
}
