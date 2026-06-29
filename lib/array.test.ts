import { describe, it, expect } from "vitest"
import { groupBy, sortBy, unique, uniqueBy, chunk, paginate, countBy, shuffle } from "./array"

describe("array", () => {
  it("groupBy — groups by key", () => {
    const data = [{ type: "A", value: 1 }, { type: "B", value: 2 }, { type: "A", value: 3 }]
    expect(groupBy(data, "type")).toEqual({
      A: [{ type: "A", value: 1 }, { type: "A", value: 3 }],
      B: [{ type: "B", value: 2 }],
    })
  })

  it("sortBy — asc", () => {
    expect(sortBy([{ n: 3 }, { n: 1 }, { n: 2 }], "n")).toEqual([{ n: 1 }, { n: 2 }, { n: 3 }])
  })

  it("sortBy — desc", () => {
    expect(sortBy([{ n: 1 }, { n: 3 }, { n: 2 }], "n", "desc")).toEqual([{ n: 3 }, { n: 2 }, { n: 1 }])
  })

  it("unique", () => {
    expect(unique([1, 2, 2, 3, 1])).toEqual([1, 2, 3])
  })

  it("uniqueBy", () => {
    expect(uniqueBy([{ id: 1 }, { id: 2 }, { id: 1 }], "id")).toEqual([{ id: 1 }, { id: 2 }])
  })

  it("chunk", () => {
    expect(chunk([1, 2, 3, 4], 2)).toEqual([[1, 2], [3, 4]])
    expect(chunk([1, 2, 3], 2)).toEqual([[1, 2], [3]])
  })

  it("paginate", () => {
    const r = paginate([1, 2, 3, 4, 5, 6, 7], 1, 3)
    expect(r.items).toEqual([1, 2, 3])
    expect(r.total).toBe(7)
    expect(r.totalPages).toBe(3)
  })

  it("paginate — last page", () => {
    expect(paginate([1, 2, 3, 4, 5, 6, 7], 3, 3).items).toEqual([7])
  })

  it("countBy", () => {
    expect(countBy(["a", "b", "a", "c", "a"])).toEqual({ a: 3, b: 1, c: 1 })
  })

  it("shuffle", () => {
    const result = shuffle([1, 2, 3, 4, 5])
    expect(result).toHaveLength(5)
    expect(result.sort()).toEqual([1, 2, 3, 4, 5])
  })
})
