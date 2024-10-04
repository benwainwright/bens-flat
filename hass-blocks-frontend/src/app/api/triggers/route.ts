import { hydrateExecutions } from "@/data/hydrate-executions";
import { initialise } from "@/data/initialise";
import { parseFindParams } from "@/utils/parse-find-params";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest, response: NextResponse) => {
  const { filter, pagination } = parseFindParams(request);

  const database = await initialise();

  const executions = await database.executions.getAll(
    { ...filter, type: "trigger", "output.continue": true },
    pagination,
    {
      created: -1,
    },
  );

  const executionsWithBlocks = await hydrateExecutions(executions, database);

  return NextResponse.json(executionsWithBlocks);
};
