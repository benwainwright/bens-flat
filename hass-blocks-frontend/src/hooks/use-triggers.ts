import { useExecutions } from "./use-executions";

interface Params {
  page?: number;
  pageSize?: number;
  parentId: string;
}

export const useTriggers = (params: Params) => {
  const { executions: triggers, error } = useExecutions({
    type: "trigger",
    ...params,
  });
  return { triggers, error };
};
