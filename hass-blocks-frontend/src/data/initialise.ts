import { MongoClient } from "mongodb";
import { getConnection } from "./get-connection";
import { createApi, DatabaseApi } from "./create-api";
import { createCollections } from "./create-collections";

const databaseExists = async (client: MongoClient, database: string) => {
  const admin = client.db().admin();

  const databases = await admin.listDatabases();

  return Boolean(databases.databases.find((item) => item.name === database));
};

const DATABASE_NAME = "hass-blocks-data";

export const initialise = async () => {
  const { client } = await getConnection();

  const exists = await databaseExists(client, DATABASE_NAME);

  const database = client.db(DATABASE_NAME);

  if (!exists) {
    await createCollections(database);
  }

  const api: DatabaseApi = {
    blocks: await createApi(database, "blocks"),
    executions: await createApi(database, "executions"),
    events: await createApi(database, "events"),
  };

  return api;
};
