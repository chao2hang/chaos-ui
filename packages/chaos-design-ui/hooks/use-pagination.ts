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
  initial: Partial<PaginationState> = {}
): PaginationResult {
  const { page: initPage = 1, pageSize: initSize = 10 } = initial
  const [page, setPage] = React.useState(initPage)
  const [pageSize, setPageSizeState] = React.useState(initSize)

  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const safePage = Math.min(page, totalPages)
  const offset = (safePage - 1) * pageSize

  const setPageSafe = React.useCallback(
    (p: number) => setPage(Math.min(Math.max(1, p), totalPages)),
    [totalPages]
  )

  const setPageSize = React.useCallback(
    (size: number) => {
      setPageSizeState(size)
      setPage(1)
    },
    []
  )

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
    next: () => setPageSafe(safePage + 1),
    prev: () => setPageSafe(safePage - 1),
    first: () => setPage(1),
    last: () => setPageSafe(totalPages),
  }
}
