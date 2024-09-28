import { entities } from "../entities.ts";
import { pauseMediaPlayer } from "./hass/media-player-pause.ts";

const { bedroomSpeaker } = entities.media_player;

export const pauseMusicInTheBedroom = pauseMediaPlayer(bedroomSpeaker.id);
