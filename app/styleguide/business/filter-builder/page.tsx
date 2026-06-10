"use client"
import * as React from "react"
import { FilterBuilder } from "@/components/business/filter-builder"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const fields = [
  { key: "name", label: "Name" },
  { key: "status", label: "Status" },
  { key: "total", label: "Total" },
  { key: "date", label: "Date" },
  { key: "category", label: "Category" },
]

export default function FilterBuilderPage() {
  const [result, setResult] = React.useState<{ logic: string; filters: { field: string; operator: string; value: string }[] } | null>(null)
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Filter Builder</h1>
      <p className="mt-2 text-muted-foreground">Visual query condition builder with AND/OR logic.</p>
      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Basic</h2>
        <FilterBuilder fields={fields} onChange={setResult} />
        {result && (
          <Card className="mt-4"><CardHeader><CardTitle className="text-sm">Output</CardTitle></CardHeader><CardContent>
            <pre className="text-xs bg-muted p-3 rounded-md overflow-auto">{JSON.stringify(result, null, 2)}</pre>
          </CardContent></Card>
        )}
      </section>
    </div>
  )
}
