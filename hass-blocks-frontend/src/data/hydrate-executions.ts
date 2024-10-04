import { DatabaseApi } from "./create-api";
import { schema, SchemaTypes } from "./schema";

export const hydrateExecutions = async (
  executions: SchemaTypes<typeof schema>["executions"][],
  database: DatabaseApi,
) => {
  const blocks = Array.from(
    new Set([
      ...executions.map((executions) => executions.instanceOf.id),
      ...executions.map((executions) => executions.parent?.id),
    ]),
  ).flatMap((block) => (block ? [block] : []));

  const blocksData = (
    await Promise.all(
      blocks.map(async (block) => await database.blocks.getAll({ id: block })),
    )
  ).flat();

  return executions.map((execution) => ({
    ...execution,
    instanceOf: blocksData.find(
      (block) => block.id === execution.instanceOf.id,
    ),
    parent: blocksData.find((block) => block.id === execution.parent?.id),
  }));
};
