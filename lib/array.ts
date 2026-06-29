/**
 * Array utility functions.
 * @since 0.2.0
 */

/**
 * Group an array by a key or callback.
 */
export function groupBy<T>(
  arr: T[],
  key: keyof T | ((item: T) => string | number),
): Record<string, T[]> {
  const getKey = typeof key === "function" ? key : (item: T) => String(item[key])
  return arr.reduce<Record<string, T[]>>((acc, item) => {
    const k = getKey(item)
    if (!acc[k]) acc[k] = []
    acc[k]!.push(item)
    return acc
  }, {})
}

/**
 * Sort an array by a key (stable).
 */
export function sortBy<T>(
  arr: T[],
  key: keyof T | ((item: T) => string | number | Date),
  direction: "asc" | "desc" = "asc",
): T[] {
  const getValue =
    typeof key === "function"
      ? key
      : (item: T) => item[key]

  return [...arr].sort((a, b) => {
    const va = getValue(a)
    const vb = getValue(b)

    let cmp = 0
    if (va instanceof Date && vb instanceof Date) {
      cmp = va.getTime() - vb.getTime()
    } else if (typeof va === "string" && typeof vb === "string") {
      cmp = va.localeCompare(vb)
    } else {
      cmp = (va as number) - (vb as number)
    }

    return direction === "desc" ? -cmp : cmp
  })
}

/**
 * Remove duplicate items from an array (shallow comparison).
 */
export function unique<T>(arr: T[]): T[] {
  return [...new Set(arr)]
}

/**
 * Remove duplicates by a key or callback.
 */
export function uniqueBy<T>(
  arr: T[],
  key: keyof T | ((item: T) => unknown),
): T[] {
  const seen = new Set<unknown>()
  const getKey = typeof key === "function" ? key : (item: T) => item[key]
  return arr.filter((item) => {
    const k = getKey(item)
    if (seen.has(k)) return false
    seen.add(k)
    return true
  })
}

/**
 * Split an array into chunks of a given size.
 */
export function chunk<T>(arr: T[], size: number): T[][] {
  const result: T[][] = []
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size))
  }
  return result
}

/**
 * Paginate an array (1-indexed page).
 */
export function paginate<T>(
  arr: T[],
  page: number,
  pageSize: number,
): { items: T[]; total: number; totalPages: number; page: number } {
  const total = arr.length
  const totalPages = Math.ceil(total / pageSize)
  const safePage = Math.max(1, Math.min(page, totalPages || 1))
  const start = (safePage - 1) * pageSize
  const items = arr.slice(start, start + pageSize)

  return { items, total, totalPages, page: safePage }
}

/**
 * Count occurrences of each value.
 */
export function countBy<T>(
  arr: T[],
  key?: keyof T | ((item: T) => string),
): Record<string, number> {
  const getKey = key
    ? typeof key === "function"
      ? key
      : (item: T) => String(item[key])
    : (item: T) => String(item)

  return arr.reduce<Record<string, number>>((acc, item) => {
    const k = getKey(item)
    acc[k] = (acc[k] || 0) + 1
    return acc
  }, {})
}

/**
 * Shuffle an array (Fisher-Yates, returns new array).
 */
export function shuffle<T>(arr: T[]): T[] {
  const result = [...arr]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j]!, result[i]!]
  }
  return result
}
