export interface FilterParams {
  type?: string;
  id?: string;
  executionId?: string;
  triggerId?: string;
  status?: string;
  notType?: string;
  parentId?: string;
  blockId?: string;
}

export interface FilterParamsWithPagination extends FilterParams {
  page: number;
  pageSize: number;
}

