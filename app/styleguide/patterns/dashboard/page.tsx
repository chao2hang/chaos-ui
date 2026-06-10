"use client"
import * as React from "react"
import { StatCard } from "@/components/business/stat-card"
import { KPICard } from "@/components/business/kpi-card"
import { LineChart, BarChart } from "@/components/business/chart"
import { ActivityFeed } from "@/components/business/activity-feed"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSignIcon, UsersIcon, ShoppingCartIcon, ActivityIcon } from "lucide-react"

const sparkline: {value:number}[] = Array.from({ length: 12 }, (_, i) => ({ value: 30 + i * 8 + Math.floor(Math.random() * 20) }))
const lineData = [
  { month: "Jan", revenue: 4000, orders: 240 },
  { month: "Feb", revenue: 3000, orders: 139 },
  { month: "Mar", revenue: 5000, orders: 380 },
  { month: "Apr", revenue: 4780, orders: 390 },
  { month: "May", revenue: 5890, orders: 480 },
  { month: "Jun", revenue: 6390, orders: 380 },
]
const barData = [
  { category: "Electronics", sales: 4000 },
  { category: "Clothing", sales: 3000 },
  { category: "Food", sales: 5000 },
  { category: "Books", sales: 2000 },
]
const activities = [
  { user: "Alice", action: "created order #1234", time: new Date().toISOString(), avatarFallback: "A" },
  { user: "Bob", action: "approved payment", time: new Date(Date.now() - 3600000).toISOString(), avatarFallback: "B", variant: "success" as const },
  { user: "Carol", action: "shipped order #1230", time: new Date(Date.now() - 7200000).toISOString(), avatarFallback: "C", variant: "info" as const },
]

export default function DashboardPatternPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Dashboard Pattern</h1>
      <p className="mt-2 text-muted-foreground">Complete dashboard layout with KPIs, charts, and activity feed.</p>
      <section className="mt-8 space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <KPICard title="Revenue" value="$45,231" change="+20.1%" changeType="positive" icon={DollarSignIcon} sparkline={sparkline} />
          <KPICard title="Users" value="8,430" change="+4.1%" changeType="positive" icon={UsersIcon} sparkline={sparkline} />
          <KPICard title="Orders" value="1,024" change="-2.3%" changeType="negative" icon={ShoppingCartIcon} sparkline={sparkline} />
          <KPICard title="Uptime" value="99.9%" change="Stable" changeType="neutral" icon={ActivityIcon} />
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          <Card><CardHeader><CardTitle className="text-sm">Revenue Trend</CardTitle></CardHeader><CardContent>
            <LineChart data={lineData} categories={["revenue"]} index="month" />
          </CardContent></Card>
          <Card><CardHeader><CardTitle className="text-sm">Sales by Category</CardTitle></CardHeader><CardContent>
            <BarChart data={barData} categories={["sales"]} index="category" />
          </CardContent></Card>
        </div>
        <Card><CardHeader><CardTitle className="text-sm">Recent Activity</CardTitle></CardHeader><CardContent>
          <ActivityFeed items={activities} />
        </CardContent></Card>
      </section>
    </div>
  )
}
