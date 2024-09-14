import { entities } from "../entities.ts";
import { turnOffMediaPlayer } from "./hass/turn-off-media-player.ts";

const { tv } = entities.media_player;

export const turnOffTv = turnOffMediaPlayer(tv.id);
