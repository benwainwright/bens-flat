import { entities } from "../entities.ts";
import { playMediaPlayer } from "./hass/media-player-play.ts";

const { bedroomSpeaker, livingRoomSpeaker } = entities.media_player;

export const playMyDiscoverWeekly = playMediaPlayer(
  "spotify:playlist:37i9dQZEVXcWyw95ymf2bT",
  "playlist",
  [bedroomSpeaker.id, livingRoomSpeaker.id]
);
