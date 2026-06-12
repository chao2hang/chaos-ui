import type { Meta, StoryObj } from "@storybook/react"
import { InvoicePreview } from "@/components/business/invoice-preview"
import type { InvoiceData } from "@/components/business/invoice-preview"

const sampleInvoice: InvoiceData = {
  id: "INV-2024-001",
  date: "2024-06-15",
  dueDate: "2024-07-15",
  from: {
    name: "Acme Corp",
    address: "123 Business Rd, Suite 100, San Francisco, CA 94102",
    email: "billing@acme.com",
  },
  to: {
    name: "Widget Inc",
    address: "456 Client Ave, New York, NY 10001",
    email: "accounts@widget.com",
  },
  items: [
    { description: "Website Redesign", quantity: 1, unitPrice: 5000 },
    { description: "SEO Optimization", quantity: 3, unitPrice: 800 },
    { description: "Hosting (monthly)", quantity: 12, unitPrice: 49.99 },
  ],
  subtotal: 8399.88,
  tax: 671.99,
  total: 9071.87,
  notes: "Thank you for your business. Payment is due within 30 days.",
}

const meta = {
  title: "Business/InvoicePreview",
  component: InvoicePreview,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  args: {
    invoice: sampleInvoice,
  },
} satisfies Meta<typeof InvoicePreview>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const NoNotes: Story = {
  args: {
    invoice: { ...sampleInvoice, notes: undefined },
  },
}

export const Dark: Story = {
  args: {
    invoice: sampleInvoice,
  },
  parameters: { backgrounds: { default: "dark" } },
}
