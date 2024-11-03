import { useBlocks } from "./use-blocks";

interface Params {
  page?: number;
  pageSize?: number;
  blockId?: string;
}

export const useAutomations = (params?: Params & { suspense?: boolean } & { refetchInterval?: number }) => {
  const theParams = params ? params : {};

  const { blocks: automations, error } = useBlocks({
    ...theParams,
    type: "automation"
  });
  return { automations, error };
};
