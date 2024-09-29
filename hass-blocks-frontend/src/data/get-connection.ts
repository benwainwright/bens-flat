import { MongoClient } from "mongodb";

export const getConnection = async () => {
  const client = await MongoClient.connect("mongodb://localhost:27017");
  return {
    client,
    [Symbol.asyncDispose]: async () => await client.close(),
  };
};
