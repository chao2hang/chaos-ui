"use client"
import * as React from "react"
import { AdvancedDataTable } from "@/components/business/advanced-data-table"

import { StatusTag } from "@/components/business/status-tag"


interface Order { id: string; customer: string; total: string; status: string; date: string }
const orders = [
  { id: "ORD-001", customer: "Acme Corp", total: "$1,234.00", status: "completed", date: "2026-06-01" },
  { id: "ORD-002", customer: "Globex Inc", total: "$567.00", status: "pending", date: "2026-06-02" },
  { id: "ORD-003", customer: "Initech", total: "$2,345.00", status: "approved", date: "2026-06-03" },
  { id: "ORD-004", customer: "Umbrella Co", total: "$890.00", status: "rejected", date: "2026-06-04" },
  { id: "ORD-005", customer: "Wayne Ent", total: "$4,567.00", status: "completed", date: "2026-06-05" },
  { id: "ORD-006", customer: "Stark Ind", total: "$3,210.00", status: "draft", date: "2026-06-06" },
  { id: "ORD-007", customer: "Oscorp", total: "$789.00", status: "cancelled", date: "2026-06-07" },
  { id: "ORD-008", customer: "LexCorp", total: "$1,500.00", status: "pending", date: "2026-06-08" },
  { id: "ORD-009", customer: "Cyberdyne", total: "$6,789.00", status: "approved", date: "2026-06-09" },
  { id: "ORD-010", customer: "Soylent", total: "$432.00", status: "completed", date: "2026-06-10" },
  { id: "ORD-011", customer: "Tyrell Corp", total: "$9,876.00", status: "pending", date: "2026-06-11" },
  { id: "ORD-012", customer: "Weyland", total: "$2,100.00", status: "completed", date: "2026-06-12" },
]

const columns = [
  { key: "id", header: "Order ID" },
  { key: "customer", header: "Customer" },
  { key: "total", header: "Total" },
  { key: "status", header: "Status", render: (row: Record<string, unknown>) => <StatusTag status={row.status as string} /> },
  { key: "date", header: "Date" },
]

export default function AdvancedDataTablePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Advanced Data Table</h1>
      <p className="mt-2 text-muted-foreground">Data table with sorting, filtering, pagination, column visibility, and row selection.</p>
      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Full Featured</h2>
        <AdvancedDataTable
          columns={columns}
          data={orders}
          pageSize={5}
          onRowClick={(row: Record<string, unknown>) => console.log("Clicked:", row.id)}
        />
      </section>
    </div>
  )
}
