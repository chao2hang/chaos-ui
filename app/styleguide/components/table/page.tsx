"use client"

import * as React from "react"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"

const invoices = [
  { invoice: "INV001", status: "Paid", method: "Credit Card", amount: "$250.00" },
  { invoice: "INV002", status: "Pending", method: "PayPal", amount: "$150.00" },
  { invoice: "INV003", status: "Unpaid", method: "Bank Transfer", amount: "$350.00" },
  { invoice: "INV004", status: "Paid", method: "Credit Card", amount: "$450.00" },
  { invoice: "INV005", status: "Paid", method: "PayPal", amount: "$550.00" },
]

const users = [
  { name: "Olivia Martin", email: "olivia@example.com", role: "Admin", status: "Active" },
  { name: "Jackson Lee", email: "jackson@example.com", role: "Editor", status: "Active" },
  { name: "Isabella Nguyen", email: "isabella@example.com", role: "Viewer", status: "Inactive" },
  { name: "William Kim", email: "william@example.com", role: "Editor", status: "Active" },
  { name: "Sofia Davis", email: "sofia@example.com", role: "Admin", status: "Active" },
]

export default function TablePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Table</h1>
      <p className="mt-2 text-muted-foreground">
        Data table component for displaying structured data with headers, rows, and footers.
      </p>

      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Basic Table</h2>
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Method</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((inv) => (
              <TableRow key={inv.invoice}>
                <TableCell className="font-medium">{inv.invoice}</TableCell>
                <TableCell>{inv.status}</TableCell>
                <TableCell>{inv.method}</TableCell>
                <TableCell className="text-right">{inv.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">With Footer</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Method</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((inv) => (
              <TableRow key={inv.invoice}>
                <TableCell className="font-medium">{inv.invoice}</TableCell>
                <TableCell>{inv.status}</TableCell>
                <TableCell>{inv.method}</TableCell>
                <TableCell className="text-right">{inv.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="text-right">$1,750.00</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">With Badges</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.email}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge variant="outline">{user.role}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={user.status === "Active" ? "default" : "secondary"}>
                    {user.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">With Selection</h2>
        <TableWithSelection />
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Striped</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Method</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((inv, i) => (
              <TableRow key={inv.invoice} className={i % 2 === 0 ? "bg-muted/50" : ""}>
                <TableCell className="font-medium">{inv.invoice}</TableCell>
                <TableCell>{inv.status}</TableCell>
                <TableCell>{inv.method}</TableCell>
                <TableCell className="text-right">{inv.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Compact</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="h-8">Invoice</TableHead>
              <TableHead className="h-8">Status</TableHead>
              <TableHead className="h-8">Method</TableHead>
              <TableHead className="h-8 text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((inv) => (
              <TableRow key={inv.invoice}>
                <TableCell className="py-1 font-medium">{inv.invoice}</TableCell>
                <TableCell className="py-1">{inv.status}</TableCell>
                <TableCell className="py-1">{inv.method}</TableCell>
                <TableCell className="py-1 text-right">{inv.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </div>
  )
}

function TableWithSelection() {
  const [selected, setSelected] = React.useState<string[]>([])

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    )
  }

  const allSelected = selected.length === invoices.length

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-10">
            <Checkbox
              checked={allSelected}
              onCheckedChange={() =>
                setSelected(allSelected ? [] : invoices.map((i) => i.invoice))
              }
            />
          </TableHead>
          <TableHead>Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((inv) => (
          <TableRow
            key={inv.invoice}
            data-state={selected.includes(inv.invoice) ? "selected" : undefined}
          >
            <TableCell>
              <Checkbox
                checked={selected.includes(inv.invoice)}
                onCheckedChange={() => toggle(inv.invoice)}
              />
            </TableCell>
            <TableCell className="font-medium">{inv.invoice}</TableCell>
            <TableCell>{inv.status}</TableCell>
            <TableCell>{inv.method}</TableCell>
            <TableCell className="text-right">{inv.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
