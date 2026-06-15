import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { InvoicePreview } from "./invoice-preview"
import type { InvoiceData } from "./invoice-preview"

const invoice: InvoiceData = {
  id: "INV-001",
  date: "2024-01-15",
  dueDate: "2024-02-15",
  from: { name: "Acme Corp", address: "123 Main St", email: "a@acme.com" },
  to: { name: "Client Inc", address: "456 Oak Ave", email: "b@client.com" },
  items: [
    { description: "Consulting", quantity: 10, unitPrice: 150 },
    { description: "Development", quantity: 1, unitPrice: 5000 },
  ],
  subtotal: 6500,
  tax: 520,
  total: 7020,
  notes: "Due in 30 days.",
}

describe("InvoicePreview", () => {
  it("renders the invoice id", () => {
    render(<InvoicePreview invoice={invoice} />)
    expect(screen.getByText("#INV-001")).toBeInTheDocument()
  })

  it("renders from and to parties", () => {
    render(<InvoicePreview invoice={invoice} />)
    expect(screen.getByText("Acme Corp")).toBeInTheDocument()
    expect(screen.getByText("Client Inc")).toBeInTheDocument()
  })

  it("renders line items", () => {
    render(<InvoicePreview invoice={invoice} />)
    expect(screen.getByText("Consulting")).toBeInTheDocument()
    expect(screen.getByText("Development")).toBeInTheDocument()
  })

  it("renders the total amount", () => {
    render(<InvoicePreview invoice={invoice} />)
    expect(screen.getByText("$7,020.00")).toBeInTheDocument()
  })

  it("renders notes when provided", () => {
    render(<InvoicePreview invoice={invoice} />)
    expect(screen.getByText("Due in 30 days.")).toBeInTheDocument()
  })

  it("applies custom className", () => {
    const { container } = render(<InvoicePreview invoice={invoice} className="custom-inv" />)
    const el = container.querySelector('[data-slot="invoice-preview"]') as HTMLElement
    expect(el.className).toContain("custom-inv")
  })
})
