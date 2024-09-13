import { entities } from "../entities.ts";
import { isEntityInState } from "./hass/is-entity-in-state.ts";

export const amIHome = isEntityInState(entities.global.person.me, "home");
