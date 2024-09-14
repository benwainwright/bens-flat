import { entities } from "../entities.ts";
import { closeCover } from "./hass/close-cover.ts";

const { livingRoomBlinds } = entities.cover;

export const closeLivingRoomBlinds = closeCover(livingRoomBlinds.id);
