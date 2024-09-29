import { Db } from "mongodb";
import { schema } from "./schema";

export const createCollections = async (database: Db) => {
  await Object.entries(schema).reduce(
    async (lastPromise, [collectionName, schema]) => {
      await lastPromise;
      await database.createCollection(collectionName, {
        validator: { $jsonSchema: schema },
        validationAction: "warn",
      });
    },
    Promise.resolve(),
  );
};
