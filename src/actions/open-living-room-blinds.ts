import { entities } from "../entities.ts";
import { openCover } from "./hass/open-cover.ts";

const { livingRoomBlinds } = entities.cover;

export const openLivingRoomBlinds = openCover(livingRoomBlinds.id);
