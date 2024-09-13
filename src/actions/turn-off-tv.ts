import { entities } from "../entities.ts";
import { turnOffMediaPlayer } from "./hass/turn-off-media-player.ts";

export const turnOffTv = turnOffMediaPlayer(entities.livingRoom.tv);
