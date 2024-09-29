import { Db, ObjectId } from "mongodb";
import { schema, SchemaTypes } from "./schema";

export type DatabaseApi = {
  -readonly [K in keyof typeof schema]: Api<K, SchemaTypes<typeof schema>[K]>;
};

export interface Api<
  K extends keyof typeof schema,
  T extends SchemaTypes<typeof schema>[K],
> {
  add: (...data: Omit<T, "id" | "updated" | "created">[]) => Promise<void>;
  update: (
    ...data: (Partial<Omit<T, "updated" | "created">> & {
      id: string;
    })[]
  ) => Promise<T[]>;
  getAll: (filter?: Partial<T>) => Promise<T[]>;
}

export const createApi = async <K extends keyof typeof schema>(
  database: Db,
  collectionName: K,
): Promise<Api<K, SchemaTypes<typeof schema>[K]>> => {
  type TheType = SchemaTypes<typeof schema>[K];

  const collection = database.collection(collectionName);
  await collection.createIndex({ id: 1 }, { unique: true });

  return {
    add: async (...data) => {
      await collection.insertMany(data);
    },
    update: async (...data) => {
      return (await Promise.all(
        data.map(async (item) => {
          const { id, ...dataWithoutId } = item;
          await collection.updateOne(
            { id: item.id },
            {
              $setOnInsert: { ...data, created: new Date() },
              $set: { ...dataWithoutId, updated: new Date() },
            },
            { upsert: true },
          );

          return data;
        }),
      )) as Awaited<ReturnType<Api<K, TheType>["update"]>>;
    },
    getAll: async (filter) => {
      const theFilter = filter ?? {};
      return (await collection.find(theFilter).toArray()).map((item) => {
        const { _id, ...rest } = item;
        return { id: _id.toString(), ...rest };
      }) as Awaited<ReturnType<Api<K, TheType>["getAll"]>>;
    },
  };
};
