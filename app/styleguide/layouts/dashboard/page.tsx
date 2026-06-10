"use client"

import * as React from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { StatCard } from "@/components/business/stat-card"
import { DataTable } from "@/components/business/data-table"
import type { Column } from "@/components/business/data-table"
import { StatusTag } from "@/components/business/status-tag"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DollarSignIcon,
  ShoppingCartIcon,
  UsersIcon,
  PackageIcon,
} from "lucide-react"

interface RecentOrder {
  id: string
  customer: string
  status: "completed" | "pending" | "approved"
  total: string
}

const recentOrders: RecentOrder[] = [
  { id: "ORD-001", customer: "Olivia Martin", status: "completed", total: "$1,250.00" },
  { id: "ORD-002", customer: "Jackson Lee", status: "pending", total: "$890.00" },
  { id: "ORD-003", customer: "Isabella Nguyen", status: "approved", total: "$2,100.00" },
  { id: "ORD-004", customer: "William Kim", status: "completed", total: "$450.00" },
  { id: "ORD-005", customer: "Sofia Davis", status: "pending", total: "$3,200.00" },
]

const columns: Column<RecentOrder>[] = [
  { key: "id", header: "Order", render: (row) => <span className="font-medium">{row.id}</span> },
  { key: "customer", header: "Customer" },
  { key: "status", header: "Status", render: (row) => <StatusTag status={row.status} /> },
  { key: "total", header: "Total", render: (row) => <span className="font-medium">{row.total}</span> },
]

export default function DashboardLayoutPage() {
  return (
    <DashboardLayout title="Dashboard">
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold">Welcome back, John</h2>
          <p className="text-sm text-muted-foreground">Here&apos;s what&apos;s happening with your store today.</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Revenue"
            value="$45,231.89"
            change="+20.1% from last month"
            changeType="positive"
            icon={DollarSignIcon}
          />
          <StatCard
            title="Orders"
            value="+573"
            change="+12.4% from last month"
            changeType="positive"
            icon={ShoppingCartIcon}
          />
          <StatCard
            title="Customers"
            value="+2,350"
            change="+4.5% from last month"
            changeType="positive"
            icon={UsersIcon}
          />
          <StatCard
            title="Products"
            value="1,248"
            change="-2.1% from last month"
            changeType="negative"
            icon={PackageIcon}
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable columns={columns} data={recentOrders} />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
