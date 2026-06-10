"use client"
import * as React from "react"
import { LineChart, BarChart, AreaChart, PieChart } from "@/components/business/chart"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const lineData = [
  { month: "Jan", revenue: 4000, expenses: 2400 },
  { month: "Feb", revenue: 3000, expenses: 1398 },
  { month: "Mar", revenue: 5000, expenses: 3800 },
  { month: "Apr", revenue: 4780, expenses: 3908 },
  { month: "May", revenue: 5890, expenses: 4800 },
  { month: "Jun", revenue: 6390, expenses: 3800 },
]

const barData = [
  { category: "Electronics", sales: 4000, returns: 240 },
  { category: "Clothing", sales: 3000, returns: 198 },
  { category: "Food", sales: 5000, returns: 300 },
  { category: "Books", sales: 2000, returns: 100 },
]

const pieData = [
  { name: "Desktop", value: 45 },
  { name: "Mobile", value: 35 },
  { name: "Tablet", value: 20 },
]

export default function ChartPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Charts</h1>
      <p className="mt-2 text-muted-foreground">Data visualization components built on Recharts.</p>
      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Line Chart</h2>
        <Card><CardHeader><CardTitle className="text-sm">Revenue vs Expenses</CardTitle></CardHeader><CardContent>
          <LineChart data={lineData} categories={["revenue", "expenses"]} index="month" />
        </CardContent></Card>
      </section>
      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Bar Chart</h2>
        <Card><CardHeader><CardTitle className="text-sm">Sales by Category</CardTitle></CardHeader><CardContent>
          <BarChart data={barData} categories={["sales", "returns"]} index="category" />
        </CardContent></Card>
      </section>
      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Area Chart</h2>
        <Card><CardHeader><CardTitle className="text-sm">Revenue Trend</CardTitle></CardHeader><CardContent>
          <AreaChart data={lineData} categories={["revenue"]} index="month" />
        </CardContent></Card>
      </section>
      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Pie Chart</h2>
        <Card><CardHeader><CardTitle className="text-sm">Device Distribution</CardTitle></CardHeader><CardContent>
          <PieChart data={pieData} category="value" index="name" />
        </CardContent></Card>
      </section>
    </div>
  )
}
