"use client"
import * as React from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import { type DateRange } from "react-day-picker"

export default function CalendarPage() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  const [range, setRange] = React.useState<DateRange | undefined>()
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
      <p className="mt-2 text-muted-foreground">Date picker calendar with single and range selection.</p>
      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Single Select</h2>
        <Card className="w-fit"><CardContent className="p-2">
          <Calendar mode="single" selected={date} onSelect={setDate} />
        </CardContent></Card>
        {date && <p className="mt-2 text-sm text-muted-foreground">Selected: {date.toLocaleDateString()}</p>}
      </section>
      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Range Select</h2>
        <Card className="w-fit"><CardContent className="p-2">
          <Calendar mode="range" selected={range} onSelect={setRange} numberOfMonths={2} />
        </CardContent></Card>
        {range?.from && <p className="mt-2 text-sm text-muted-foreground">{range.from.toLocaleDateString()} - {range.to?.toLocaleDateString() ?? "..."}</p>}
      </section>
      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Disabled Past + Dropdown</h2>
        <Card className="w-fit"><CardContent className="p-2">
          <Calendar mode="single" disabled={{ before: new Date() }} captionLayout="dropdown" />
        </CardContent></Card>
      </section>
    </div>
  )
}
