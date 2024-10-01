import { initialise } from "@/data/initialise";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest, response: NextResponse) => {
  const queryString = request.nextUrl.searchParams;

  const type = queryString.get("type");
  const withType = type ? { type } : {};

  const id = queryString.get("id");
  const withId = id ? { id } : {};

  const triggerId = queryString.get("triggerId");
  const withTriggerId = triggerId ? { triggerId } : {};

  const status = queryString.get("status");
  const withStatus = status ? { status } : {};

  const page = queryString.get("page");
  const pageSize = queryString.get("pageSize");

  const parent = queryString.get("parentId");

  const withParent = parent
    ? { parent: { id: parent, collection: "blocks" } }
    : {};

  const finalFilter = {
    ...withType,
    ...withId,
    ...withTriggerId,
    ...withStatus,
    ...withParent,
  };

  console.log(finalFilter);

  const database = await initialise();

  const pagination =
    page && pageSize
      ? { page: parseInt(page, 10), pageSize: parseInt(pageSize, 10) }
      : undefined;

  const executions = await database.executions.getAll(finalFilter, pagination);

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
