"use client"
import * as React from "react"

export interface PaginationState {
  page: number
  pageSize: number
}

export interface PaginationResult extends PaginationState {
  total: number
  totalPages: number
  offset: number
  hasNext: boolean
  hasPrev: boolean
  setPage: (page: number) => void
  setPageSize: (size: number) => void
  next: () => void
  prev: () => void
  first: () => void
  last: () => void
}

export function usePagination(
  total: number,
  initial: Partial<PaginationState> = {},
): PaginationResult {
  const { page: initPage = 1, pageSize: initSize = 10 } = initial
  const [page, setPage] = React.useState(initPage)
  const [pageSize, setPageSizeState] = React.useState(initSize)

  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const safePage = Math.min(page, totalPages)
  const offset = (safePage - 1) * pageSize

  const setPageSafe = React.useCallback(
    (p: number) => setPage(Math.min(Math.max(1, p), totalPages)),
    [totalPages],
  )

  const setPageSize = React.useCallback((size: number) => {
    setPageSizeState(size)
    setPage(1)
  }, [])

  // nav 方法。next/prev 依赖 safePage,会在翻页时重建——
  // 这是可接受的:依赖 next 的 effect/useMemo 本来就应该在翻页后重算。
  const next = React.useCallback(() => setPageSafe(safePage + 1), [setPageSafe, safePage])
  const prev = React.useCallback(() => setPageSafe(safePage - 1), [setPageSafe, safePage])
  const first = React.useCallback(() => setPage(1), [])
  const last = React.useCallback(() => setPageSafe(totalPages), [setPageSafe, totalPages])

  return {
    page: safePage,
    pageSize,
    total,
    totalPages,
    offset,
    hasNext: safePage < totalPages,
    hasPrev: safePage > 1,
    setPage: setPageSafe,
    setPageSize,
    next,
    prev,
    first,
    last,
  }
}
