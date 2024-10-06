import { hydrateBlocks } from "@/data/hydrate-blocks";
import { initialise } from "@/data/initialise";
import { parseFindParams } from "@/utils/parse-find-params";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const { filter, pagination } = parseFindParams(request);

  const database = await initialise();

  const executions = await database.executions.getAll(filter, pagination, {
    created: -1,
  });

  const executionsWithBlocks = await hydrateBlocks(executions, database);

  return NextResponse.json(executionsWithBlocks);
};
