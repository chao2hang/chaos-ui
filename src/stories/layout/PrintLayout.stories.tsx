import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { PrintLayout } from "@/components/layout/print-layout"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const meta = {
  title: "Layouts/PrintLayout",
  component: PrintLayout,
  tags: ["autodocs", "a11y"],
} satisfies Meta<typeof PrintLayout>

export default meta
type Story = StoryObj<typeof meta>

export const CustomerInvoice: Story = {
  render: () => (
    <PrintLayout>
      <div className="space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-2xl font-semibold">QXY Foods</p>
            <p className="text-sm text-neutral-600">Enterprise supply invoice</p>
          </div>
          <div className="text-right text-sm">
            <p className="font-medium">Invoice INV-2026-0613</p>
            <p>Issued June 13, 2026</p>
            <p>Due June 28, 2026</p>
          </div>
        </div>
        <Separator />
        <div className="grid gap-6 text-sm sm:grid-cols-2">
          <div>
            <p className="font-semibold">Bill To</p>
            <p>North Star Retail Group</p>
            <p>Central purchasing department</p>
            <p>Beijing, China</p>
          </div>
          <div>
            <p className="font-semibold">Shipment</p>
            <p>Cold chain route CN-N-18</p>
            <p>Temperature controlled - 2-8 C</p>
            <Badge variant="outline" className="mt-2">
              Ready for finance archive
            </Badge>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>SKU</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Cases</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              ["FV-102", "Frozen mixed vegetables 10kg", "240", "CNY 38,400"],
              ["DM-221", "Dairy blend carton 1L", "510", "CNY 45,900"],
              ["DR-078", "Shelf-stable sauce pack", "180", "CNY 12,240"],
            ].map(([sku, description, cases, amount]) => (
              <TableRow key={sku}>
                <TableCell>{sku}</TableCell>
                <TableCell>{description}</TableCell>
                <TableCell className="text-right">{cases}</TableCell>
                <TableCell className="text-right">{amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="text-right">CNY 96,540</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </PrintLayout>
  ),
}

export const PickingManifest: Story = {
  render: () => (
    <PrintLayout>
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xl font-semibold">Outbound Picking Manifest</p>
            <p className="text-sm text-neutral-600">Route CN-E-04 - Dock 7</p>
          </div>
          <Badge variant="secondary">Pick by 14:30</Badge>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Zone</TableHead>
              <TableHead>Item</TableHead>
              <TableHead>Lot</TableHead>
              <TableHead className="text-right">Quantity</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              ["A-12", "Pork dumpling retail pack", "LOT-88421", "96 cases"],
              ["C-03", "Frozen corn 5kg", "LOT-77102", "44 cases"],
              ["D-18", "Seafood soup base", "LOT-12990", "22 cases"],
            ].map(([zone, item, lot, quantity]) => (
              <TableRow key={lot}>
                <TableCell>{zone}</TableCell>
                <TableCell>{item}</TableCell>
                <TableCell>{lot}</TableCell>
                <TableCell className="text-right">{quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="grid gap-4 text-sm sm:grid-cols-3">
          <div className="rounded border p-3">
            <p className="font-medium">Picker Signature</p>
            <p className="mt-6 border-t pt-2 text-neutral-500">Name / time</p>
          </div>
          <div className="rounded border p-3">
            <p className="font-medium">QA Release</p>
            <p className="mt-6 border-t pt-2 text-neutral-500">Name / time</p>
          </div>
          <div className="rounded border p-3">
            <p className="font-medium">Driver Handoff</p>
            <p className="mt-6 border-t pt-2 text-neutral-500">Name / time</p>
          </div>
        </div>
      </div>
    </PrintLayout>
  ),
}
