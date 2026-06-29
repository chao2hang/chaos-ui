import { describe, it, expect } from "vitest"
import { many, userFactory, orderFactory } from "./factory"
import { seedFaker } from "./seed"

describe("factory", () => {
  it("produces items with default shape", () => {
    const u = userFactory()
    expect(u).toHaveProperty("id")
    expect(u).toHaveProperty("name")
    expect(u).toHaveProperty("email")
    expect(u).toHaveProperty("role")
  })

  it("applies overrides", () => {
    const u = userFactory({ name: "Alice", role: "admin" })
    expect(u.name).toBe("Alice")
    expect(u.role).toBe("admin")
  })

  it("produces deterministic results with same seed", () => {
    const a = many(userFactory, 3, 42)
    const b = many(userFactory, 3, 42)
    expect(a.map((u) => u.name)).toEqual(b.map((u) => u.name))
    expect(a.map((u) => u.id)).toEqual(b.map((u) => u.id))
  })

  it("produces different results with different seeds", () => {
    const a = many(userFactory, 3, 1)
    const b = many(userFactory, 3, 2)
    expect(a.map((u) => u.name)).not.toEqual(b.map((u) => u.name))
  })

  it("orderFactory generates valid order", () => {
    const o = orderFactory()
    expect(o.amount).toBeGreaterThanOrEqual(100)
    expect(o.amount).toBeLessThanOrEqual(50000)
  })

  it("seedFaker sets seed", () => {
    seedFaker(123)
    const a = userFactory()
    seedFaker(123)
    const b = userFactory()
    expect(a.name).toBe(b.name)
  })
})
