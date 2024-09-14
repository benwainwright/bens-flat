import { createSnapshotScene } from "./create-snapshot-scene.ts";
import { entities } from "../entities.ts";

const { restoreState } = entities.scene;
const { livingRoomLights } = entities.light;
const { livingRoomAdaptiveLighting } = entities.switch;
const { spotify } = entities.media_player;

export const recordStateOfLivingRoom = createSnapshotScene(
  restoreState.id.split(".")[1],
  [livingRoomLights.id, livingRoomAdaptiveLighting.id, spotify.id]
);
