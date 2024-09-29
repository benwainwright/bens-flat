import { JSONSchema7 } from "json-schema";

interface BsonSchema extends Omit<Readonly<JSONSchema7>, "type"> {
  readonly bsonType: string;
  readonly properties?: Record<string, BsonSchema>;
  readonly required?: string[];
}

const reference = (description: string) =>
  ({
    bsonType: "object",
    description,
    required: ["id", "collection"],
    properties: {
      id: {
        bsonType: "string",
        description:
          "The unique identifier for the reference in the foreign collection",
      },
      collection: {
        bsonType: "string",
        description: "The name of the collection that the reference points to",
      },
    },
  }) as const satisfies BsonSchema;

type Schema = Record<string, BsonSchema>;

type TypesFromBsonSchema<T extends BsonSchema> = T extends {
  bsonType: "string";
}
  ? string
  : T extends { bsonType: "date" }
    ? Date
    : T extends {
          bsonType: "object";
          properties: infer P;
          required?: infer R extends ReadonlyArray<string>;
          description?: string;
        }
      ? P extends Record<string, BsonSchema>
        ? {
            [K in keyof P]: K extends R[number]
              ? TypesFromBsonSchema<P[K]>
              : TypesFromBsonSchema<P[K]> | undefined;
          }
        : never
      : never;

export type SchemaTypes<S extends typeof schema> = {
  [K in keyof S]: S[K] extends BsonSchema ? TypesFromBsonSchema<S[K]> : never;
};

export const schema = {
  blocks: {
    bsonType: "object",
    properties: {
      id: {
        bsonType: "string",
        description: "The unique identifier for the automation",
      },
      status: {
        bsonType: "string",
        description: "The current status of the automation",
      },
      name: {
        bsonType: "string",
        description: "The name of the automation",
      },
      type: {
        bsonType: "string",
        description: "The type of block",
      },
    },
  },
  executions: {
    bsonType: "object",
    required: [
      "id",
      "triggerId",
      "type",
      "status",
      "created",
      "updated",
      "instanceOf",
    ],
    properties: {
      id: {
        bsonType: "string",
        description: "The unique identifier for the execution",
      },
      triggerId: {
        bsonType: "string",
        description: "The unique identifier for a given series of executions",
      },
      type: {
        bsonType: "string",
        description: "The kind of execution",
      },
      status: {
        bsonType: "string",
        description: "The current status of the trigger",
      },
      created: {
        bsonType: "date",
        description: "The time that the action was created",
      },
      updated: {
        bsonType: "date",
        description: "The time that the action was updated",
      },
      parent: reference("The parent block that this execution started within"),
      instanceOf: reference("The block that this execution originates from"),
    },
  },
} as const satisfies Schema;
