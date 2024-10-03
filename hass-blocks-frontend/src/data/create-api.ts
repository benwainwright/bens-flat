import { Db, ObjectId, MongoServerError } from "mongodb";
import { schema, SchemaTypes } from "./schema";
import { writeFileSync } from "node:fs";
import { v4 } from "uuid";
import { MONGO_DUPLICATE_KEY } from "./constants";

export type DatabaseApi = {
  -readonly [K in keyof typeof schema]: Api<K, SchemaTypes<typeof schema>[K]>;
};

interface PaginationParams {
  page: number;
  pageSize: number;
}

type Filter<T> = { [K in keyof T]: T[K] | { $ne: T[K] } };

type SortParams<T> = { -readonly [K in keyof T]: 1 | -1 };

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
  getAll: <R extends Partial<SchemaTypes<typeof schema>[K]>>(
    filter?: Record<string, unknown>,
    pagination?: PaginationParams,
    sort?: SortParams<R>
  ) => Promise<T[]>;

  countAll: (filter?: Partial<T>) => Promise<number>;
}

export const createApi = async <K extends keyof typeof schema>(
  database: Db,
  collectionName: K
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
          const params = {
            filter: { id: item.id },
            update: {
              $set: { ...item, updated: new Date(), created: new Date() },
            },
          };
          try {
            const { created, ...initialUpdate } = params.update.$set;

            const result = await collection.updateOne(params.filter, {
              $set: initialUpdate,
            });

            if (result.matchedCount === 0) {
              await collection.insertOne(params.update.$set);
            }

            return data;
          } catch (error) {
            if (error instanceof MongoServerError) {
              if (error.code !== MONGO_DUPLICATE_KEY) {
                writeFileSync(
                  `failed-insert/${v4()}.json`,
                  JSON.stringify(params, null, 2)
                );
              }

              console.log(
                `Error: [${error.code}] ${error.message} ${error.errInfo?.detals}`
              );
            }
          }
        })
      )) as Awaited<ReturnType<Api<K, TheType>["update"]>>;
    },
    getAll: async (filter, pagination, sort) => {
      const theFilter = filter ?? {};
      const query = collection.find(theFilter);

      const queryWithPagination = pagination
        ? query
            .skip(pagination.page * pagination.pageSize)
            .limit(pagination.pageSize)
        : query;

      const queryWithSort = sort
        ? queryWithPagination.sort(sort)
        : queryWithPagination;

      return (await queryWithSort.toArray()) as Awaited<
        ReturnType<Api<K, TheType>["getAll"]>
      >;
    },
    countAll: async (filter) => {
      const theFilter = filter ?? {};
      return await collection.countDocuments(theFilter);
    },
  };
};
