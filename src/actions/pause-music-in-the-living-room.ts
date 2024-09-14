import { entities } from "../entities.ts";
import { pauseMediaPlayer } from "./hass/media-player-pause.ts";

const { livingRoomSpeaker } = entities.media_player;

export const pauseMusicInTheLivingRoom = pauseMediaPlayer(livingRoomSpeaker.id);
