import { entities } from "../entities.ts";
import { closeCover } from "./hass/close-cover.ts";

export const closeLivingRoomBlinds = closeCover(entities.livingRoom.blinds);
