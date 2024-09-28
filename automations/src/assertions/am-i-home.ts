import { entities } from "../entities.ts";
import { isEntityInState } from "./hass/is-entity-in-state.ts";

const { me } = entities.person;

export const amIHome = isEntityInState(me.id, "home");
