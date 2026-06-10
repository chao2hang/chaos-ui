"use client"
import { KPICard } from "@/components/business/kpi-card"
import { DollarSignIcon, UsersIcon, ShoppingCartIcon, ActivityIcon } from "lucide-react"

const sparkline = Array.from({ length: 12 }, (_, i) => ({ value: Math.floor(Math.random() * 100) + 20 + i * 5 }))

export default function KPICardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">KPI Card</h1>
      <p className="mt-2 text-muted-foreground">Enhanced metric card with sparkline and target progress.</p>
      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">With Sparkline</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <KPICard title="Revenue" value="$45,231" change="+20.1%" changeType="positive" changeLabel="vs last month" icon={DollarSignIcon} sparkline={sparkline} />
          <KPICard title="Users" value="8,430" change="+4.1%" changeType="positive" changeLabel="vs last month" icon={UsersIcon} sparkline={sparkline} />
          <KPICard title="Orders" value="1,024" change="-2.3%" changeType="negative" changeLabel="vs last month" icon={ShoppingCartIcon} sparkline={sparkline} />
          <KPICard title="Uptime" value="99.9%" change="Stable" changeType="neutral" icon={ActivityIcon} />
        </div>
      </section>
      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">With Target Progress</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <KPICard title="Monthly Goal" value="$50,000" change="$45,231" changeType="positive" target={90} targetLabel="To goal" icon={DollarSignIcon} sparkline={sparkline} />
          <KPICard title="New Customers" value="156" change="+12%" changeType="positive" target={78} targetLabel="To target" icon={UsersIcon} />
        </div>
      </section>
    </div>
  )
}
