"use client"

import * as React from "react"
import { DataTable } from "@/components/business/data-table"
import type { Column } from "@/components/business/data-table"
import { StatusTag } from "@/components/business/status-tag"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { toast } from "sonner"

interface Order {
  id: string
  customer: string
  email: string
  amount: number
  status: string
  date: string
}

const mockData: Order[] = [
  {
    id: "ORD-001",
    customer: "Alice Johnson",
    email: "alice@example.com",
    amount: 250.0,
    status: "completed",
    date: "2024-01-15",
  },
  {
    id: "ORD-002",
    customer: "Bob Smith",
    email: "bob@example.com",
    amount: 120.5,
    status: "pending",
    date: "2024-01-16",
  },
  {
    id: "ORD-003",
    customer: "Carol White",
    email: "carol@example.com",
    amount: 89.99,
    status: "approved",
    date: "2024-01-17",
  },
  {
    id: "ORD-004",
    customer: "Dave Brown",
    email: "dave@example.com",
    amount: 340.0,
    status: "rejected",
    date: "2024-01-18",
  },
  {
    id: "ORD-005",
    customer: "Eve Davis",
    email: "eve@example.com",
    amount: 175.25,
    status: "draft",
    date: "2024-01-19",
  },
]

const basicColumns: Column<Order>[] = [
  { key: "id", header: "Order ID" },
  { key: "customer", header: "Customer" },
  { key: "email", header: "Email" },
  {
    key: "amount",
    header: "Amount",
    render: (row) => `$${row.amount.toFixed(2)}`,
  },
  { key: "date", header: "Date" },
]

const customColumns: Column<Order>[] = [
  { key: "id", header: "Order ID" },
  { key: "customer", header: "Customer" },
  {
    key: "amount",
    header: "Amount",
    render: (row) => (
      <span className="font-medium">${row.amount.toFixed(2)}</span>
    ),
  },
  {
    key: "status",
    header: "Status",
    render: (row) => <StatusTag status={row.status} size="sm" />,
  },
  { key: "date", header: "Date" },
]

export default function DataTablePage() {
  const handleRowClick = (row: Order) => {
    toast(`Clicked row: ${row.id} — ${row.customer}`)
  }

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">DataTable</h1>
      <p className="mt-2 text-muted-foreground">
        A simplified data table with column definitions and optional row click.
      </p>

      <section className="mt-8 space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Basic Table</CardTitle>
            <CardDescription>
              Simple table with 5 rows of mock order data
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable columns={basicColumns} data={mockData} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Custom Cell Renderers</CardTitle>
            <CardDescription>
              Formatted amounts and status tags using render functions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable columns={customColumns} data={mockData} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>With Row Click</CardTitle>
            <CardDescription>
              Click a row to see a toast notification
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable
              columns={customColumns}
              data={mockData}
              onRowClick={handleRowClick}
            />
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
