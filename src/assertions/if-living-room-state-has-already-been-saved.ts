import { ifEntityExists } from "./hass/if-entity-exists.ts";
import { entities } from "../entities.ts";

export const ifLivingRoomStateHasAlreadyBeenSaved = ifEntityExists(
  entities.livingRoom.restoreState
);
