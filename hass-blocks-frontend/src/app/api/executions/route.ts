import { initialise } from "@/data/initialise";
import { NextRequest, NextResponse } from "next/server";
import { parseFindParams } from "./parse-find-params";

export const GET = async (request: NextRequest, response: NextResponse) => {
  const { filter, pagination } = parseFindParams(request);

  const database = await initialise();

  const executions = await database.executions.getAll(filter, pagination, {
    created: -1,
  });

  const blocks = Array.from(
    new Set([
      ...executions.map((executions) => executions.instanceOf.id),
      ...executions.map((executions) => executions.parent?.id),
    ])
  ).flatMap((block) => (block ? [block] : []));

  const blocksData = (
    await Promise.all(
      blocks.map(async (block) => await database.blocks.getAll({ id: block }))
    )
  ).flat();

  const executionsWithBlocks = executions.map((execution) => ({
    ...execution,
    instanceOf: blocksData.find(
      (block) => block.id === execution.instanceOf.id
    ),
    parent: blocksData.find((block) => block.id === execution.parent?.id),
  }));

  return NextResponse.json(executionsWithBlocks);
};
