"use client"
import { StatCard } from "@/components/business/stat-card"
import { UsersIcon, DollarSignIcon, ShoppingCartIcon, ActivityIcon } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function StatCardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">StatCard</h1>
      <p className="mt-2 text-muted-foreground">
        Stats card showing a metric with trend indicator.
      </p>

      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Positive Change</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Revenue"
            value="$45,231.89"
            change="+20.1% from last month"
            changeType="positive"
          />
          <StatCard
            title="Subscriptions"
            value="+2,350"
            change="+180.1% from last month"
            changeType="positive"
            icon={UsersIcon}
          />
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Negative Change</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Active Users"
            value="1,203"
            change="-5.2% from last month"
            changeType="negative"
            icon={ActivityIcon}
          />
          <StatCard
            title="Avg. Order Value"
            value="$62.40"
            change="-3.1% from last month"
            changeType="negative"
            icon={ShoppingCartIcon}
          />
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Neutral Change</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Pending Orders"
            value="42"
            change="No change"
            changeType="neutral"
            icon={ShoppingCartIcon}
          />
          <StatCard
            title="Conversion Rate"
            value="3.6%"
            change="Stable"
            changeType="neutral"
          />
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">With Icon</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Revenue"
            value="$12,450"
            change="+12.5%"
            changeType="positive"
            icon={DollarSignIcon}
          />
          <StatCard
            title="Users"
            value="8,430"
            change="+4.1%"
            changeType="positive"
            icon={UsersIcon}
          />
          <StatCard
            title="Orders"
            value="1,024"
            change="-2.3%"
            changeType="negative"
            icon={ShoppingCartIcon}
          />
          <StatCard
            title="Uptime"
            value="99.9%"
            change="Stable"
            changeType="neutral"
            icon={ActivityIcon}
          />
        </div>
      </section>
    </div>
  )
}
