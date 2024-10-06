import { initialise } from "@/data/initialise";
import { parseFindParams } from "@/utils/parse-find-params";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const { filter, pagination } = parseFindParams(request);

  const database = await initialise();

  const events = await database.blocks.getAll(filter, pagination, {
    created: -1,
  });

  return NextResponse.json(events);
};
