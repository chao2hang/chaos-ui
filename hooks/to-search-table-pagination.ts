/**
 * Map useCrud / usePagination state into SearchTable's pagination prop shape.
 *
 * @example
 * const crud = useCrud(...)
 * <SearchTable pagination={toSearchTablePagination(crud.pagination, crud.total)} />
 */
export interface SearchTablePaginationSource {
  page: number;
  pageSize: number;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
}

export interface SearchTablePagination {
  current: number;
  pageSize: number;
  total: number;
  onChange: (page: number, pageSize: number) => void;
}

export function toSearchTablePagination(
  pagination: SearchTablePaginationSource,
  total: number,
): SearchTablePagination {
  return {
    current: pagination.page,
    pageSize: pagination.pageSize,
    total,
    onChange: (page, pageSize) => {
      if (pageSize !== pagination.pageSize) {
        pagination.setPageSize(pageSize);
        return;
      }
      pagination.setPage(page);
    },
  };
}
