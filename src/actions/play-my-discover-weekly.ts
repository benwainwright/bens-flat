import { entities } from "../entities.ts";
import { playMediaPlayer } from "./hass/media-player-play.ts";

export const playMyDiscoverWeekly = playMediaPlayer(
  "spotify:playlist:37i9dQZEVXcWyw95ymf2bT",
  "playlist",
  [entities.livingRoom.speaker, entities.bedroom.speaker]
);
