import type { Meta, StoryObj } from "@storybook/react"
import { PrintLayout } from "@/components/layout/print-layout"

const meta = {
  title: "Layouts/PrintLayout",
  component: PrintLayout,
  tags: ["autodocs"],
} satisfies Meta<typeof PrintLayout>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="bg-muted/30 p-6">
      <p className="mb-4 text-xs text-muted-foreground">
        Surrounding content (hidden on print):
      </p>
      <PrintLayout>
        <h1 className="text-2xl font-bold">Invoice #INV-2024-001</h1>
        <p className="mt-2 text-sm text-neutral-700">Issued: January 15, 2024</p>
        <table className="mt-6 w-full border-collapse text-sm">
          <thead>
            <tr className="border-b text-left">
              <th className="py-2">Item</th>
              <th className="py-2">Qty</th>
              <th className="py-2 text-right">Price</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-2">Pro plan</td>
              <td className="py-2">1</td>
              <td className="py-2 text-right">$49.00</td>
            </tr>
            <tr className="border-b">
              <td className="py-2">Seats</td>
              <td className="py-2">5</td>
              <td className="py-2 text-right">$25.00</td>
            </tr>
          </tbody>
        </table>
        <p className="mt-8 text-right text-lg font-semibold">Total: $74.00</p>
      </PrintLayout>
    </div>
  ),
}

export const Receipt: Story = {
  render: () => (
    <PrintLayout>
      <div className="space-y-1 text-center">
        <h2 className="text-lg font-bold">Chaos Café</h2>
        <p className="text-xs">123 Brew Street, Bean Town</p>
        <p className="text-xs">Order #0042 — 2024-01-15</p>
      </div>
      <hr className="my-3 border-dashed" />
      <ul className="space-y-1 text-sm">
        <li className="flex justify-between"><span>Espresso</span><span>$3.50</span></li>
        <li className="flex justify-between"><span>Croissant</span><span>$4.20</span></li>
      </ul>
      <hr className="my-3 border-dashed" />
      <p className="text-right text-sm font-bold">Total: $7.70</p>
    </PrintLayout>
  ),
}

export const Dark: Story = {
  parameters: { backgrounds: { default: "dark" } },
  render: () => (
    <div className="dark">
      <PrintLayout>
        <h1 className="text-2xl font-bold">Print preview</h1>
        <p className="mt-2 text-sm">
          Even on a dark page, the print root is rendered on a white sheet so it prints cleanly.
        </p>
      </PrintLayout>
    </div>
  ),
}
