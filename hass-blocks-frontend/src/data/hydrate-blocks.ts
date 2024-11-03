import { DatabaseApi } from "./create-api";
import { SerialisedBlock } from "@/hooks/use-data-fetcher";

interface InstanceOfBlock {
  instanceOf: {
    id: string;
  };
}

interface WithParent {
  parent?: {
    id: string;
  };
}

type Hydrated<T extends InstanceOfBlock & WithParent> = T & {
  instanceOf: SerialisedBlock,
  parent: SerialisedBlock
}

export const hydrateBlocks = async <T extends InstanceOfBlock & WithParent>
  (
    executions: T[],
    database: DatabaseApi,
  ): Promise<Hydrated<T>[]> => {
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
  })) as Hydrated<T>[];
};
