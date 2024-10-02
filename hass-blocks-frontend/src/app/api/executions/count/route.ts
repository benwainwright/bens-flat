import { initialise } from "@/data/initialise";
import { NextRequest, NextResponse } from "next/server";
import { parseFindParams } from "../parse-find-params";

export const GET = async (request: NextRequest, response: NextResponse) => {
  const { filter } = parseFindParams(request);

  const database = await initialise();

  return NextResponse.json({
    count: await database.executions.countAll(filter),
  });
};
