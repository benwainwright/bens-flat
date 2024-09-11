import { createSnapshotScene } from "./create-snapshot-scene.ts";
import { entities } from "../entities.ts";

export const recordStateOfLivingRoom = createSnapshotScene(
  entities.livingRoom.restoreState.split(".")[1],
  [
    entities.livingRoom.light,
    entities.livingRoom.adaptiveLighting,
    entities.global.mediaPlayer.spotify,
  ]
);
