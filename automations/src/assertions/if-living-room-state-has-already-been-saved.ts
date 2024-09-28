import { ifEntityExists } from "./hass/if-entity-exists.ts";
import { entities } from "../entities.ts";

const { restoreState } = entities.scene;

export const ifLivingRoomStateHasAlreadyBeenSaved = ifEntityExists(
  restoreState.id
);
