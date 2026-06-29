import { describe, it, expect } from "vitest"
import { render } from "@testing-library/react"
import { AuditLog } from "./audit-log"

const entries = [
  { id: "1", actor: { name: "Alice" }, action: "create", target: "Order #1", timestamp: Date.now() - 3600_000 },
  { id: "2", actor: { name: "Bob" }, action: "delete", target: "Order #2", timestamp: Date.now() - 1800_000 },
  { id: "3", actor: { name: "Charlie" }, action: "login", timestamp: Date.now() - 600_000, ip: "10.0.0.1" },
]

describe("AuditLog", () => {
  it("renders all entries", () => {
    const { container } = render(<AuditLog entries={entries} />)
    expect(container.textContent).toContain("Alice")
    expect(container.textContent).toContain("Bob")
    expect(container.textContent).toContain("Charlie")
  })

  it("renders action text", () => {
    const { container } = render(<AuditLog entries={entries} />)
    expect(container.textContent).toContain("创建了")
    expect(container.textContent).toContain("删除了")
  })

  it("renders with custom className", () => {
    const { container } = render(<AuditLog entries={entries} className="custom-al" />)
    expect(container.querySelector('[data-slot="audit-log"]')?.className).toContain("custom-al")
  })
})
