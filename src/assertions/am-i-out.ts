import { entities } from "../entities.ts";
import { ifEntityIsNotInState } from "./hass/if-entity-is-not-in-state.ts";

const { me } = entities.person;

export const amIOut = ifEntityIsNotInState(me.id, "home");
