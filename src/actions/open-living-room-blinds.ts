import { entities } from "../entities.ts";
import { openCover } from "./hass/close-cover.ts";

export const openLivingRoomBlinds = openCover(entities.livingRoom.blinds);
