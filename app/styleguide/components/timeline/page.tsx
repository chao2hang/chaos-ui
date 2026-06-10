"use client"
import * as React from "react"
import { Timeline, TimelineItem, TimelineDot, TimelineConnector, TimelineContent, TimelineTitle, TimelineDescription, TimelineTime } from "@/components/ui/timeline"
import { CheckCircleIcon, ClockIcon, PackageIcon } from "lucide-react"

const variants = ["default", "success", "warning", "destructive", "info"] as const

export default function TimelinePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Timeline</h1>
      <p className="mt-2 text-muted-foreground">Vertical timeline for events and activities.</p>
      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Order Tracking</h2>
        <Timeline>
          <TimelineItem><TimelineDot variant="success"><CheckCircleIcon className="size-4" /></TimelineDot><TimelineConnector /><TimelineContent>
            <TimelineTitle>Order Confirmed</TimelineTitle><TimelineDescription>Order #1234 placed.</TimelineDescription><TimelineTime>2 hours ago</TimelineTime>
          </TimelineContent></TimelineItem>
          <TimelineItem><TimelineDot variant="info"><PackageIcon className="size-4" /></TimelineDot><TimelineConnector /><TimelineContent>
            <TimelineTitle>Shipped</TimelineTitle><TimelineDescription>Package dispatched.</TimelineDescription><TimelineTime>1 hour ago</TimelineTime>
          </TimelineContent></TimelineItem>
          <TimelineItem><TimelineDot><ClockIcon className="size-4" /></TimelineDot><TimelineContent>
            <TimelineTitle>In Transit</TimelineTitle><TimelineDescription>Expected delivery tomorrow.</TimelineDescription><TimelineTime>30 min ago</TimelineTime>
          </TimelineContent></TimelineItem>
        </Timeline>
      </section>
      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Dot Variants</h2>
        <Timeline>
          {variants.map((v) => (
            <TimelineItem key={v}><TimelineDot variant={v} /><TimelineConnector /><TimelineContent>
              <TimelineTitle className="capitalize">{v}</TimelineTitle>
            </TimelineContent></TimelineItem>
          ))}
        </Timeline>
      </section>
    </div>
  )
}
