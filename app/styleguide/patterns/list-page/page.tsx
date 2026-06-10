"use client"

import * as React from "react"
import { PageHeader } from "@/components/business/page-header"
import { DataTable } from "@/components/business/data-table"
import type { Column } from "@/components/business/data-table"
import { StatusTag } from "@/components/business/status-tag"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination"
import { PlusIcon, SearchIcon, DownloadIcon, FilterIcon } from "lucide-react"

interface Order {
  id: string
  customer: string
  email: string
  status: "completed" | "pending" | "approved" | "draft"
  date: string
  total: string
}

const mockOrders: Order[] = [
  { id: "ORD-001", customer: "Olivia Martin", email: "olivia@example.com", status: "completed", date: "2024-01-15", total: "$1,250.00" },
  { id: "ORD-002", customer: "Jackson Lee", email: "jackson@example.com", status: "pending", date: "2024-01-14", total: "$890.00" },
  { id: "ORD-003", customer: "Isabella Nguyen", email: "isabella@example.com", status: "approved", date: "2024-01-13", total: "$2,100.00" },
  { id: "ORD-004", customer: "William Kim", email: "william@example.com", status: "completed", date: "2024-01-12", total: "$450.00" },
  { id: "ORD-005", customer: "Sofia Davis", email: "sofia@example.com", status: "draft", date: "2024-01-11", total: "$3,200.00" },
  { id: "ORD-006", customer: "James Wilson", email: "james@example.com", status: "pending", date: "2024-01-10", total: "$1,780.00" },
  { id: "ORD-007", customer: "Mia Johnson", email: "mia@example.com", status: "completed", date: "2024-01-09", total: "$560.00" },
  { id: "ORD-008", customer: "Benjamin Brown", email: "benjamin@example.com", status: "approved", date: "2024-01-08", total: "$920.00" },
]

const columns: Column<Order>[] = [
  {
    key: "id",
    header: "Order",
    render: (row) => <span className="font-medium">{row.id}</span>,
  },
  {
    key: "customer",
    header: "Customer",
    render: (row) => (
      <div>
        <div className="font-medium">{row.customer}</div>
        <div className="text-xs text-muted-foreground">{row.email}</div>
      </div>
    ),
  },
  {
    key: "status",
    header: "Status",
    render: (row) => <StatusTag status={row.status} />,
  },
  {
    key: "date",
    header: "Date",
  },
  {
    key: "total",
    header: "Total",
    render: (row) => <span className="font-medium">{row.total}</span>,
  },
]

export default function ListPagePattern() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Orders"
        description="Manage and track customer orders"
        actions={
          <>
            <Button variant="outline" size="sm">
              <DownloadIcon />
              Export
            </Button>
            <Button size="sm">
              <PlusIcon />
              New Order
            </Button>
          </>
        }
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search orders..." className="pl-8" />
        </div>
        <Select>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="sm">
          <FilterIcon />
          More Filters
        </Button>
      </div>

      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Badge variant="secondary">{mockOrders.length} orders</Badge>
      </div>

      <DataTable columns={columns} data={mockOrders} />

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">Showing 1-8 of 24 results</p>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}
