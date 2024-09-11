import { entities } from "../entities.ts";
import { pauseMediaPlayer } from "./hass/media-player-pause.ts";

export const pauseMusicInTheLivingRoom = pauseMediaPlayer(
  entities.livingRoom.speaker
);
