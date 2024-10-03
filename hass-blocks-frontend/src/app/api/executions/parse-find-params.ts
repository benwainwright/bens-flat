import { NextRequest } from "next/server";

export const parseFindParams = (request: NextRequest) => {
  const queryString = request.nextUrl.searchParams;

  const page = queryString.get("page");
  const pageSize = queryString.get("pageSize");

  const pagination =
    page && pageSize
      ? { page: parseInt(page, 10), pageSize: parseInt(pageSize, 10) }
      : undefined;

  const type = queryString.get("type");
  const withType = type ? { type } : {};

  const notType = queryString.get("notType");
  const withNotType = notType ? { type: { $ne: notType } } : {};

  const id = queryString.get("id");
  const withId = id ? { id } : {};

  const triggerId = queryString.get("triggerId");
  const withTriggerId = triggerId ? { triggerId } : {};

  const status = queryString.get("status");
  const withStatus = status ? { status } : {};

  const parent = queryString.get("parentId");

  const blockId = queryString.get("blockId");
  const withBlockId = blockId
    ? { parent: { id: blockId, collection: "blocks" } }
    : {};

  const withParent = parent
    ? { parent: { id: parent, collection: "blocks" } }
    : {};

  return {
    pagination,
    filter: {
      ...withType,
      ...withNotType,
      ...withId,
      ...withTriggerId,
      ...withStatus,
      ...withParent,
      ...withBlockId,
    },
  };
};
