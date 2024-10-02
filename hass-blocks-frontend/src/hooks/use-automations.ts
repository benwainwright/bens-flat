import { useExecutions } from "./use-executions";

interface Params {
  page?: number;
  pageSize?: number;
  blockId?: string;
}

export const useAutomations = (params?: Params) => {
  const theParams = params ? params : {};

  const { executions: automations, error } = useExecutions({
    ...theParams,
    type: "automation",
  });
  return { automations, error };
};
