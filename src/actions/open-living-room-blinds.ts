import { entities } from "../entities.ts";
import { openCover } from "./hass/open-cover.ts";

export const openLivingRoomBlinds = openCover(entities.livingRoom.blinds);
