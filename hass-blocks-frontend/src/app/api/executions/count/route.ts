import { initialise } from "@/data/initialise";
import { parseFindParams } from "@/utils/parse-find-params";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest, response: NextResponse) => {
  const { filter } = parseFindParams(request);

  const database = await initialise();

  return NextResponse.json({
    count: await database.executions.countAll(filter),
  });
};
