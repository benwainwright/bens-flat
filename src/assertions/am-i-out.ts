import { entities } from "../entities.ts";
import { ifEntityIsNotInState } from "./hass/if-entity-is-not-in-state.ts";

export const amIOut = ifEntityIsNotInState(entities.global.person.me, "home");
