import { Action } from "hass-lego";

export const createSnapshotScene = (newSceneId: string, entities: string[]) => {
  return new Action({
    name: "Snapshot entities",
    callback: async (client) => {
      await client.callService("scene", "create", {
        scene_id: newSceneId,
        entities: {},
        snapshot_entities: entities,
      });
    },
  });
};
